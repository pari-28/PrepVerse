# Backend Development Guide

This guide documents the setup, execution, and structure of the PrepVerse Node.js/Express.js backend engine.

---

## ⚡ Server Entry Point (`server.ts`)

The backend resides in `server.ts` at the root directory. It runs as a self-contained Express server that serves two primary purposes:
1. **API Proxying**: Exposing `/api/*` endpoints to handle sensitive requests (like calling the Google Gen AI API) securely without exposing private environment variables to the browser.
2. **Static Asset Delivery**: In production (`NODE_ENV === 'production'`), it serves compiled frontend bundles from the `dist/` directory.

---

## 🧭 Request Pipeline & Middlewares

### 1. Development Mode
In development mode, we mount the standard **Vite Development Server** as a middleware directly within Express:
```ts
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}
```
This enables features like hot reloading and TypeScript compilation in development while running everything on a single port (`3000`).

### 2. Production Mode
In production mode, Vite is bypassed. Express serves the statically built frontend from the `/dist` directory and routes all unresolved routes to `/dist/index.html` to allow client-side routing to work seamlessly:
```ts
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
```

---

## 🔐 Environment variables

The server relies on the following variables:
- `GEMINI_API_KEY`: Required to authenticate with the Google Gen AI API for mock interviews and resume feedback loops.
- `PORT`: (Default: `3000`) Configured via the hosting container environment. Do not override this port.
- `NODE_ENV`: Set to `production` in production environments.
