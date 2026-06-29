# Artificial Intelligence & Gemini Integrations

This document covers the AI subsystem architecture in PrepVerse, detailing how we leverage the modern `@google/genai` SDK and configure models to evaluate candidate submissions.

---

## 🛠️ Google Gen AI SDK Integration

We use the official, modern `@google/genai` TypeScript SDK. 

### Server-side Initialization
The SDK client must only be initialized on the server side (inside `server.ts` or server-specific utility files) to safeguard the private API key:

```ts
import { GoogleGenAI } from "@google/genai";

// Initialize the client lazily
let aiClient: GoogleGenAI | null = null;

export function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}
```

---

## 🤖 Model Selection

- **Default Model**: We prefer `gemini-2.5-flash` for high-speed conversational responses, mock interview assessments, and general resume evaluations.
- **Advanced Complex Tasks**: We prefer `gemini-2.5-pro` for deep coding reviews, automated structural design evaluations, and highly complex system design feedback.

---

## 📝 Evaluation Prompt Guidelines

When creating prompt instructions, we adhere to strict structured formatting using system instructions to enforce JSON responses:

```ts
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: [
    { role: 'user', parts: [{ text: userPrompt }] }
  ],
  config: {
    systemInstruction: "You are a senior recruiter. Evaluate the answer and return a JSON object with 'score', 'pros', and 'cons' arrays.",
    responseMimeType: "application/json"
  }
});
```

Enforcing `responseMimeType: "application/json"` ensures that our backend parses evaluation outcomes safely and consistently without risking string truncation or formatting bugs.
