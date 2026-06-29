/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

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

// Chat endpoint for general coach prompts
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGeminiClient();
    
    // Construct system instructions
    const systemInstruction = `You are PrepVerse AI Coach, an expert tech recruiter and elite competitive coder. 
Help the student prepare for placements and internships. Keep answers highly professional, actionable, structured with markdown, and direct. Avoid generic, flowery text. Refer to the student's preparation goals when helpful.`;

    // Map history if present, or do a simple content generation
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while speaking with Gemini.' });
  }
});

// Customized Weekly Study Plan Generator
app.post('/api/gemini/study-plan', async (req, res) => {
  try {
    const { targetCompany, dailyHours, currentYear, coreSkills, currentRating } = req.body;
    
    const ai = getGeminiClient();
    const prompt = `Create a highly tailored 4-week placement study roadmap for a student with these parameters:
- **Target Company**: ${targetCompany || 'Top Product Companies'}
- **Daily Prep Budget**: ${dailyHours || '2'} hours/day
- **Current Standing**: Year ${currentYear || '3'} student
- **Current LeetCode/Coding Rating**: ${currentRating || 'Beginner'}
- **Current Core Skillset**: ${coreSkills || 'C++, Data Structures'}

Break down the roadmap week-by-week. For each week specify:
1. Core Topics (e.g., Arrays, Sliding Window, Trees, System Design)
2. Daily hour breakdown (e.g., Day 1-2: Theory, Day 3-5: Sheet Problems, Day 6: Mock, Day 7: Revision)
3. 3 Specific problems to target
4. Crucial Tip for cracking ${targetCompany || 'Product Companies'} interviews.

Return the response in well-formatted Markdown with standard headers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an elite placement coordinator who builds concrete, calendar-style weekly roadmap plans. Never return empty boxes or placeholders.',
        temperature: 0.2
      }
    });

    res.json({ roadmap: response.text });
  } catch (error: any) {
    console.error('Study Plan error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate study roadmap.' });
  }
});

// Resume ATS Suggester / Bullet Point Optimizer
app.post('/api/gemini/resume-review', async (req, res) => {
  try {
    const { bulletPoint, role, techKeywords } = req.body;
    if (!bulletPoint) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    const ai = getGeminiClient();
    const prompt = `Review and optimize the following resume bullet point or project description to maximize its ATS matching score and impact.
Targeting Role: ${role || 'Software Engineering Intern'}
Preferred Keywords to incorporate: ${techKeywords || 'React, Node, TypeScript, Performance, Scale'}

Original Resume Segment:
"${bulletPoint}"

Provide your feedback in three concise blocks:
1. **Optimized Segment**: Rewritten bullet point following the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]" with active action verbs.
2. **Key Keywords Added**: List of crucial terms integrated.
3. **Aesthetic Impact Tip**: Why this is more convincing to a tech recruiter.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert resume consultant who works with candidates applying to Ivy League tech companies and top tier startups. Keep it precise and high impact.',
        temperature: 0.3
      }
    });

    res.json({ feedback: response.text });
  } catch (error: any) {
    console.error('Resume Review error:', error);
    res.status(500).json({ error: error.message || 'Failed to review resume segment.' });
  }
});

// Mock Interview Automated Evaluator
app.post('/api/gemini/interview-grade', async (req, res) => {
  try {
    const { question, candidateAnswer, category } = req.body;
    if (!question || !candidateAnswer) {
      return res.status(400).json({ error: 'Question and candidate answer are required' });
    }

    const ai = getGeminiClient();
    const prompt = `Evaluate this candidate's response to the technical/behavioral interview question:
- **Category**: ${category || 'Core Computer Science'}
- **Question**: ${question}
- **Candidate Answer**: "${candidateAnswer}"

Provide a detailed evaluation structured as follows:
- **Score**: [Provide a numerical integer score from 1 to 10]
- **Pros / What went well**: [State what key terms or concepts they explained correctly]
- **Cons / Missing details**: [Highlight any errors, vagueness, or missing industry standards]
- **Standard Reference Answer**: [Give a concise, ideal model answer incorporating proper technical terms]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an engineering manager grading technical candidates. Be constructive, strict, and precise in your grading scale. Award higher scores only for comprehensive, structurally sound answers.',
        temperature: 0.2
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
