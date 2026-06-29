# PrepVerse 🚀

PrepVerse is a modern, community-driven placement and internship preparation platform designed to help students and career changers excel in technical interviews, DSA, ATS resume screening, aptitude tests, and company-specific coding rounds.

Built with a premium visual design and powered by Google Gemini, PrepVerse offers structured learning roadmaps, real-time feedback loops, and a collaborative community hub.

---

## 🗺️ Open Source & Community Initiatives

PrepVerse is fully optimized for collaborative open-source initiatives and community-led hackathons. We provide modular, highly structured guides and task planners to welcome first-time contributors:

- **📅 [Project Roadmap](./ROADMAP.md)**: Explore the active Phase 1 to Phase 4 development milestones.
- **🏗️ [Architecture Overview](./ARCHITECTURE.md)**: Understand system layouts, modular states, and client-server sequence flows.
- **💬 [Contributor Support](./SUPPORT.md)**: Join our community channels and get instant help with setup.
- **🔐 [Security Policy](./SECURITY.md)**: Review our vulnerability reporting standards.
- **🏷️ [GitHub Label Directory](./.github/labels.md)**: Official registry of issues and pull request labels.

---

## 📖 Contributor Documentation (`docs/`)

Explore our detailed, step-by-step documentation designed to help you onboard and start contributing:

1. **🚀 [Getting Started](./docs/GettingStarted.md)**: The onboarding path for new open-source contributors.
2. **🛠️ [Local Installation](./docs/Installation.md)**: Learn how to set up Node, configure keys, and launch dev environments.
3. **🧭 [Sequence Flow Architecture](./docs/Architecture.md)**: Explains the internal communication flows and render loops.
4. **🎨 [Frontend Guidelines](./docs/Frontend.md)**: Learn how to design responsive components matching our visual guidelines.
5. **🔌 [Backend Development](./docs/Backend.md)**: Guides on Express routing, middlewares, and API endpoints.
6. **🤖 [Gemini AI Integrations](./docs/AI.md)**: Learn how we securely interact with the Google Gen AI SDK on the server side.
7. **🟢 [API Endpoints Directory](./docs/API.md)**: Public request structures and response schemas.
8. **📂 [Directory Tree Structure](./docs/FolderStructure.md)**: Overview of where different components and datasets live.
9. **📋 [Agile Project Boards](./docs/ProjectBoards.md)**: Overview of our Kanban workflow columns (Backlog to Done).
10. **☁️ [Containerization & Deployment](./docs/Deployment.md)**: Learn how to package the app with Docker and deploy to Cloud Run.

---

## 🎯 Curated Roadmap Task Boards (`roadmap/`)

We have populated over **100 meaningful, pre-planned issue ideas** categorized by difficulty. Feel free to claim any of these to earn rank milestones:

- **🟢 [Beginner Task Board](./roadmap/beginner-issues.md)** (36 issues with `good first issue` guidelines)
- **🟡 [Intermediate Task Board](./roadmap/intermediate-issues.md)** (36 features, math, and layout synchronizations)
- **🔴 [Advanced Task Board](./roadmap/advanced-issues.md)** (30 cloud sync, compiler sandbox, and audio AI integrations)

---

## Key Features

- 💻 **DSA Sandbox & Tracker**: Exhaustive problem banks categorized by Blind 75, NeetCode 150, and Striver Sheet. Track progress with code templates, difficulty tags, and video walkthroughs.
- 📄 **ATS Resume Studio**: Build compliance-ready resumes with beautiful minimalist templates. Get real-time ATS score feedback and AI suggestions for your bullet points.
- 🗣️ **Interview Hub**: Simulated technical and behavioral rounds categorized by core CS (OS, DBMS, CN, OOP) and popular tech stacks. Practice speaking and get dynamic grading feedback from the AI coach.
- 🏢 **Company-Specific Prep Guides**: Dedicated insights into OA (Online Assessment) patterns, eligibility criteria, interview rounds, and curated resources for Google, Microsoft, Meta, and more.
- ⏱️ **Timed Aptitude Quizzes**: Practice quantitative, logical, and verbal aptitude with live clocks and step-by-step mathematical explanations.
- 🤖 **Interactive AI Coach**: Generate customized weekly study roadmaps, analyze pasted resumes, and review career options with Gemini.
- 👥 **Community & Leaderboard**: Share real interview experiences, publish helpful notes, and rise up the contributor leaderboard by earning XP and badges.

---

## Tech Stack

### Frontend & Client
- **React (v19)** with **Vite**
- **Tailwind CSS (v4)** for high-performance styling
- **Motion** for smooth, responsive layout transitions
- **Lucide Icons** for modern iconography

### Backend & AI
- **Node.js** & **Express** server
- **Google Gemini API** (`@google/genai` TypeScript SDK)
- Server-side routing with lazy initialization and zero client-side API key leakage.

---

## Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prepverse/prepverse.git
   cd prepverse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your API key:
   ```env
   GEMINI_API_KEY="your_google_gemini_api_key"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build and Test**:
   ```bash
   npm run lint   # Verifies static compilation
   npm test       # Runs CI smoke tests
   npm run build  # Builds production outputs
   ```

---

## Contributing

We welcome contributions from developers worldwide! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) to understand our commit guidelines, branch naming conventions, and pull request workflows.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](./LICENSE) file for more details.
