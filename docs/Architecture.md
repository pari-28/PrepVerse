# Subsystem Architecture & Sequence Flows

This guide dives deeper into the specific sequence flows and layout hierarchy behind the PrepVerse subsystem communication.

---

## 🏗️ Hierarchical Flow Chart

```
                        ┌──────────────────┐
                        │     App.tsx      │ (Global States, Tabs, Theme)
                        └────────┬─────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
          ┌───────────────────┐     ┌───────────────────┐
          │  LandingPage.tsx  │     │   Navigation.tsx  │ (Responsive Sidebar/Top Header)
          └───────────────────┘     └─────────┬─────────┘
                                              │
                      ┌───────────────────────┼───────────────────────┐
                      ▼                       ▼                       ▼
             ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
             │  Dashboard.tsx  │     │  DsaModule.tsx  │     │ InterviewHub.tsx│
             └─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                                      │
                                                                 (HTTPS API)
                                                                      │
                                                             ┌────────▼────────┐
                                                             │    server.ts    │
                                                             └────────┬────────┘
                                                                      │
                                                               (Gemini Node SDK)
                                                                      │
                                                             ┌────────▼────────┐
                                                             │   Gemini API    │
                                                             └─────────────────┘
```

---

## 🔄 Dynamic Evaluation Sequence

The sequence chart below outlines how code feedback and mock interview replies are submitted, evaluated, and persistent states are recalculated:

1. **User interaction**: Candidate types code inside `DsaModule.tsx` or clicks "Submit Answer" inside `InterviewHub.tsx`.
2. **Local Validation**: Frontend checks input bounds (non-empty string, length constraints).
3. **API Proxy**: Frontend posts payload to `/api/evaluate` on the Node server (safely preventing browser-side leakage of `GEMINI_API_KEY`).
4. **AI Generation**: The Node server receives the request, initializes the `@google/genai` client, sends the context prompt to `gemini-2.5-flash`, and awaits the JSON response.
5. **Score Allocation**: The Node server proxies the formatted results back to the client.
6. **Parent State Synchronization**: Upon receiving the successful result, the child component fires a callback to the parent `App.tsx` state (`setUserStats`) to increment candidate XP, update solved task counters, and trigger visual achievement alerts.
7. **Refreshed Layout**: The home screen progress gauge instantly recalculates progress toward the daily goal using the updated states.
