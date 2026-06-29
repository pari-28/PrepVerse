# Project Directory Structure

This file documents the layout and organizational hierarchy of directories and core files inside **PrepVerse**.

---

## 📂 Repository File Tree

```
├── .github/                       # GitHub repository configurations
│   ├── ISSUE_TEMPLATE/            # Templates for bug reports, features, docs
│   ├── workflows/                 # Automated CI/CD pipelines (Lint, Test, etc.)
│   ├── labels.md                  # Registry of official GitHub labels
│   └── PULL_REQUEST_TEMPLATE.md   # Guidelines for PR submittals
│
├── assets/                        # Static assets, branding, and graphics
│
├── docs/                          # Comprehensive development guide (this folder)
│   ├── GettingStarted.md          # Onboarding guide for new contributors
│   ├── Installation.md            # Installation steps for local setups
│   ├── Architecture.md            # Sequence diagrams and communication flows
│   ├── Frontend.md                # Styling, themes, and React rules
│   ├── Backend.md                 # Express.js structure and server setup
│   ├── AI.md                      # Gemini SDK configurations
│   ├── API.md                     # Endpoint registries
│   ├── FolderStructure.md         # Directory architecture (this file)
│   └── Deployment.md              # Cloud Run and compilation pipelines
│
├── roadmap/                       # Categorized issue roadmaps with 100+ tasks
│   ├── beginner-issues.md         # Small-scoped issues marked "Good First Issue"
│   ├── intermediate-issues.md     # Moderate features, code playgrounds, math
│   └── advanced-issues.md         # Algorithmic analyzers, persistent databases
│
├── src/                           # Client React code and configurations
│   ├── components/                # Independent, reusable UI components
│   │   ├── AdminDashboard.tsx     # Curriculum and Candidate Moderator Panel
│   │   ├── AiCoach.tsx            # AI Chat bot and syllabus generator
│   │   ├── Aptitude.tsx           # Numerical assessment panel
│   │   ├── Community.tsx          # Contribution forums and threads
│   │   ├── Dashboard.tsx          # Real-time streak statistics and planner
│   │   ├── DsaModule.tsx          # Active code playground and compilations
│   │   ├── InterviewHub.tsx       # Simulated video/audio mock responses
│   │   ├── LandingPage.tsx        # Dynamic landing page and hero header
│   │   ├── Navigation.tsx         # Sidebar and top header layouts
│   │   ├── OpenSourceMeta.tsx     # Open-source Contribution center
│   │   ├── Profile.tsx            # Candidate milestone rankings and progress
│   │   ├── ResumeStudio.tsx       # Resume bullets ATS feedback optimizer
│   │   └── Settings.tsx           # Candidate daily milestones configurations
│   │
│   ├── data/                      # Hardcoded curricula, questions, and sets
│   │   ├── aptitudeData.ts        # Database of logical/quant questions
│   │   ├── dsaData.ts             # Curated lists of DSA challenges (Blind 75)
│   │   └── interviewData.ts       # Registry of behavioral mock interview queries
│   │
│   ├── types.ts                   # Unified TypeScript definitions (ForumPost, UserStats, etc.)
│   ├── main.tsx                   # React client bootstrap entry point
│   └── index.css                  # Tailwinds design layer and typography definitions
│
├── .env.example                   # Template documenting required variables
├── index.html                     # Primary HTML container
├── package.json                   # Dependency manager script registry
├── server.ts                      # Full-stack Node/Express engine
├── tsconfig.json                  # TypeScript compiler rules
└── vite.config.ts                 # Client compilation plugin instructions
```
