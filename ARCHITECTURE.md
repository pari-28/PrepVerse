# Architecture & System Design

This document details the high-level software architecture, data flows, and core structural patterns behind **PrepVerse**. This is a great starting point for open-source contributors looking to understand how the modules interact.

---

## 🗺️ High-Level System Architecture

PrepVerse is engineered as a robust **full-stack React SPA (Single-Page Application)** combined with an **Express.js API server** which proxies secure operations (like Google Gen AI/Gemini requests) and handles server-side hosting in production environments.

```
┌────────────────────────────────────────────────────────┐
│                      FRONTEND                          │
│  React 19 (TypeScript) + Vite + Tailwind CSS + Motion │
└───────────────────────────┬────────────────────────────┘
                            │
                    HTTP / JSON API
                            │
┌───────────────────────────▼────────────────────────────┐
│                      BACKEND                           │
│  Express.js (Node.js)                                  │
│  - Port 3000 Ingress Routing                           │
│  - API proxying & Static assets delivery               │
│  - Gemini API SDK (Server-Side)                        │
└───────────────────────────┬────────────────────────────┘
                            │
                   Secure Integration
                            │
┌───────────────────────────▼────────────────────────────┐
│                   EXTERNAL SERVICES                    │
│  - Google Gen AI SDK (Gemini-2.5-flash / Pro)          │
│  - Firebase (Firestore & Auth - Roadmap Feature)       │
└────────────────────────────────────────────────────────┘
```

---

## 🧩 Architectural Subsystems

### 1. Unified Shell & Layout (`src/App.tsx` & `src/components/Navigation.tsx`)
The root `App.tsx` serves as the primary router, housing global state (such as `userStats` and `theme`) and rendering the selected tab. The layout is wrapped by `Navigation.tsx`, which serves a responsive grid layout with sliding mobile menus and persistent desktop drawers.

### 2. Gamified Tracker Engine (`src/components/Dashboard.tsx`)
This dashboard translates the user's progress into gamified elements:
- Custom radial gauge visualizing daily goals.
- Checklist representing real-time candidate tasks. Completing tasks triggers clean state updates that recalculate user XP and milestones without causing component side-effects.

### 3. Client-Side Code Playground (`src/components/DsaModule.tsx`)
Provides a complete IDE experience in the browser:
- Renders the curated problem bank (`src/data/dsaData.ts`).
- Interactive textarea with custom tab handling, mock test executor, and syntax compilation status logs.
- Dynamic tab panel rendering problem description, editorial writeups, video walkthrough frames, and persistent study notes.

### 4. Interactive Interview Simulator (`src/components/InterviewHub.tsx`)
A conversational coach allowing users to answer behavioral and technical questions:
- Leverages the secure backend proxy endpoint (`/api/evaluate`) to call the Google Gen AI (Gemini) API.
- Generates precise scores, pros/cons, and suggested references without exposing sensitive keys to the browser.

### 5. Aptitude & Logical Brain (`src/components/Aptitude.tsx`)
Provides a highly responsive, time-boxed exam module:
- Implements custom timers using `setInterval` with clean component-unmount garbage collection.
- Logs answers, tracks progress, and updates XP upon exam submission.

### 6. Administrative Panel & Contributor Hub (`src/components/AdminDashboard.tsx` & `src/components/OpenSourceMeta.tsx`)
Allows local moderation of curriculum lists and details contributors' bounties, licenses, and installation routines.

---

## ⚡ Key Coding & State Conventions

- **State Persistence (Roadmap)**: Current development states are managed via React states. Firebase Firestore is scheduled as the primary persistent cloud layer in Phase 2.
- **Strict Separation of Keys**: All sensitive API keys (e.g. `GEMINI_API_KEY`) reside exclusively on the server side in `server.ts` or helper modules. The React app never imports or uses keys directly.
- **Lucide Icons**: All icons MUST be imported from `lucide-react` directly. Do not use inline SVGs or custom raw tags.
