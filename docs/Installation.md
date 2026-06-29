# Local Installation Guide

Follow these instructions to set up, configure, and boot the PrepVerse development suite on your local machine.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:
- **Node.js**: Version `18.x`, `20.x`, or `22.x` (Long-Term Support recommended)
- **npm**: Version `9.x` or higher
- **Git**: For version control

---

## 🛠️ Step-by-Step Setup

### 1. Clone the Repository
Clone the repository to your local directory using git:
```bash
git clone https://github.com/prepverse/prepverse.git
cd prepverse
```

### 2. Install Dependencies
Install all required npm packages for both the client compilation and server proxies:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the template `.env.example` file to create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Open `.env` in your text editor and add your development credentials:
```env
# Google Gemini API key for AI Interview Hub & Resume reviews
GEMINI_API_KEY=your_gemini_api_key_here
```

*Note: For security reasons, never commit your `.env` file containing actual secrets to GitHub!*

### 4. Run the Development Server
Launch the full-stack development environment:
```bash
npm run dev
```

This starts the **Express.js API server** and mounts the **Vite middleware compiler** synchronously. 

- Frontend: Accessible at [http://localhost:3000](http://localhost:3000)
- API endpoint: Accessible at [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 🧹 Other Standard Commands

### Run Linter & Type Check
Verify that your changes follow the styling guides and generate zero compiler errors:
```bash
npm run lint
```

### Compile Application
Compile the full-stack static bundle and backend bundles for production verification:
```bash
npm run build
```

### Start Production Server
Launch the locally compiled bundle using Node.js:
```bash
npm run start
```
