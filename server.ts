/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import rateLimit from 'express-rate-limit';

// ponytail: pure framework-agnostic business rules live in src/use-cases.
// Route handlers below delegate prompt construction + security checks there.
import {
  hasMaliciousContent,
  isPayloadTooLarge,
  buildStudyPlanPrompt,
  buildResumeReviewPrompt,
  buildInterviewGradePrompt,
  studyPlanConfig,
  resumeReviewConfig,
  interviewGradeConfig,
  chatConfig,
  chatSystemInstruction,
} from './src/use-cases/ai-prompts';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is not configured. Please add it in Settings > Secrets.');
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// ==========================================
// API ROUTES
// ==========================================

// --- Security Middleware ---

// Rate limiting for AI endpoints: 20 requests per 15 minutes per IP
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Basic Prompt Injection Protection Middleware
const promptInjectionCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (hasMaliciousContent(req.body)) {
    return res.status(403).json({ error: 'Security Exception: Potentially malicious prompt detected.' });
  }

  if (isPayloadTooLarge(req.body)) {
    return res.status(413).json({ error: 'Payload Too Large: Prompt exceeds maximum allowed length.' });
  }

  next();
};

// Chat endpoint for general coach prompts
app.post('/api/gemini/chat', aiRateLimiter, promptInjectionCheck, async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGeminiClient();

    // System instruction + config come from the pure use-case
    const { systemInstruction, temperature } = chatConfig();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while speaking with Gemini.' });
  }
});

// Customized Weekly Study Plan Generator
app.post('/api/gemini/study-plan', aiRateLimiter, promptInjectionCheck, async (req, res) => {
  try {
    const { targetCompany, dailyHours, currentYear, coreSkills, currentRating } = req.body;

    const ai = getGeminiClient();
    const prompt = buildStudyPlanPrompt({ targetCompany, dailyHours, currentYear, coreSkills, currentRating });
    const { systemInstruction, temperature } = studyPlanConfig();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature,
      }
    });

    res.json({ roadmap: response.text });
  } catch (error: any) {
    console.error('Study Plan error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate study roadmap.' });
  }
});

// Resume ATS Suggester / Bullet Point Optimizer
app.post('/api/gemini/resume-review', aiRateLimiter, promptInjectionCheck, async (req, res) => {
  try {
    const { bulletPoint, role, techKeywords } = req.body;
    if (!bulletPoint) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    const ai = getGeminiClient();
    const prompt = buildResumeReviewPrompt({ bulletPoint, role, techKeywords });
    const { systemInstruction, temperature } = resumeReviewConfig();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature,
      }
    });

    res.json({ feedback: response.text });
  } catch (error: any) {
    console.error('Resume Review error:', error);
    res.status(500).json({ error: error.message || 'Failed to review resume segment.' });
  }
});

// Mock Interview Automated Evaluator
app.post('/api/gemini/interview-grade', aiRateLimiter, promptInjectionCheck, async (req, res) => {
  try {
    const { question, candidateAnswer, category } = req.body;
    if (!question || !candidateAnswer) {
      return res.status(400).json({ error: 'Question and candidate answer are required' });
    }

    const ai = getGeminiClient();
    const prompt = buildInterviewGradePrompt({ question, candidateAnswer, category });
    const { systemInstruction, temperature } = interviewGradeConfig();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature,
      }
    });

    res.json({ evaluation: response.text });
  } catch (error: any) {
    console.error('Interview Grade error:', error);
    res.status(500).json({ error: error.message || 'Failed to evaluate interview response.' });
  }
});

// Standard backend health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ==========================================
// VITE DEV SERVER MIDDLEWARE & STATIC SERVING
// ==========================================

async function initializeViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development server middleware mounted.');
  } else {
    // Production Mode - serve bundled static assets from /dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Fallback to SPA index.html for React Router compatibility
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static assets from:', distPath);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PrepVerse server running on http://localhost:${PORT}`);
  });
}

initializeViteOrStatic().catch((err) => {
  console.error('Failed to initialize server middleware:', err);
});
