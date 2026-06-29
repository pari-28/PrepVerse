# Application Compilation & Deployment Guide

This guide documents the production compilation pipelines and container strategies used to package PrepVerse for deployment in high-availability cloud environments (such as Google Cloud Run).

---

## 🏗️ The Build Pipeline (`npm run build`)

PrepVerse runs as a full-stack Node.js process. When compiling the application, we execute:
```bash
npm run build
```
This single command handles two distinct phases:

### Phase 1: Client Compilation (Vite)
Vite parses `/index.html` and compiles our TypeScript React modules into optimized, static chunks under `/dist`. Assets are tree-shaken, styles are extracted using Tailwind, and files are minified.

### Phase 2: Server Bundle Compilation (esbuild)
Because the Node runtime can sometimes trigger strict module resolution warnings on relative imports, we use `esbuild` to compile `server.ts` into a **single, bundled, self-contained CommonJS file** (`dist/server.cjs`):
```bash
esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
```
- `--packages=external`: Leaves dependencies (like `express`) as external runtime imports, keeping our compiled server bundle incredibly lightweight.
- `--format=cjs`: Outputting CommonJS completely bypasses Node runtime ES module relative path checking issues, enabling fast container startup times.

---

## 🐳 Containerization & Dockerfile

Below is the standard, production-ready `Dockerfile` used to build and package PrepVerse:

```dockerfile
# Step 1: Base image
FROM node:20-alpine AS builder
WORKDIR /app

# Step 2: Install dependencies
COPY package*.json ./
RUN npm ci

# Step 3: Copy source and build
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Step 4: Run-time image
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled bundles from builder
COPY --from=builder /app/dist ./dist

# Expose required port
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

# Boot command
CMD ["npm", "run", "start"]
```

---

## ☁️ Deploying to Google Cloud Run

To deploy the built container directly to Google Cloud Run, follow these commands using the Google Cloud CLI (`gcloud`):

### 1. Build and push your image to Artifact Registry
```bash
gcloud builds submit --tag gcr.io/your-project-id/prepverse:latest
```

### 2. Deploy your service to Cloud Run
Ensure you pass your secret `GEMINI_API_KEY` during deployment:
```bash
gcloud run deploy prepverse \
  --image gcr.io/your-project-id/prepverse:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars GEMINI_API_KEY=your_gemini_api_key_here
```
This deploys the container in under a minute, exposing a secured public URL that communicates with our backend on port `3000`.
