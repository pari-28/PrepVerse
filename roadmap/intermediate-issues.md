# Intermediate Roadmap Issues

These issues are suitable for contributors who are comfortable with React state management, custom hooks, form handling, and Express routing. They are tagged with **medium** and **intermediate**.

---

## 💻 DSA Module & Code Playgrounds

### 37. DSA: Add Advanced Search and Filtering by Company Tag
- **Category**: DSA
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Implement a multi-select search dropdown to filter the DSA problems catalog by corporate tags (e.g., Google, Amazon, Microsoft).

### 38. DSA: Preserve Unsubmitted Code in LocalStorage
- **Category**: DSA
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Cache the user's active solution draft in `localStorage` keyed by problem ID, preventing work loss when refreshing or switching tabs.

### 39. DSA: Syntax Highlighting for the Code Playgrounds
- **Category**: DSA
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Integrate a lightweight, customizable code highlighting component or layout inside the code text editor view.

### 40. DSA: Display Space and Time Complexity Badges on Editorial Walkthroughs
- **Category**: DSA
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Add visual complexity chips (e.g., `O(N log N) Time`, `O(N) Space`) at the top of problem editorials.

### 41. DSA: Custom Code Template Generator
- **Category**: DSA
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Generate languages-specific code stubs (C++, Python, Java) dynamically based on problem templates when a user changes language settings.

### 42. DSA: Toggle Console Input/Output Panel Height
- **Category**: DSA
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Design a resizable divider that allows candidates to expand or collapse the mock compilation terminal panel.

---

## 📄 Resume Studio & Bullet Point Analyzer

### 43. Resume: Implement an Interactive ATS Score Gauge
- **Category**: Resume Studio
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Calculate a simulated ATS compatibility score based on the occurrence of target keywords and bullet lengths, rendering it on a radial progress chart.

### 44. Resume: Keyword Matcher and Highlighter
- **Category**: Resume Studio
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Highlight words in the user's input segment that match desired industry keywords in real time as they type.

### 45. Resume: History of Optimized Bullet Segments
- **Category**: Resume Studio
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Maintain an active local history panel allowing candidates to view and copy previously optimized resume bullet structures.

### 46. Resume: One-Click Export to Text/Markdown Format
- **Category**: Resume Studio
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Build an export button that compiles the candidate's optimized resume bullet points into a clean, downloadable `.txt` or `.md` file.

---

## 🎙️ Interview Hub & Conversational Coach

### 47. Interview: Interactive Sound Ripple and Audio Input Feedback
- **Category**: Interview Hub
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Render a dynamic, pulsing canvas ripple effect while the microphone captures simulated audio feedback from candidates.

### 48. Interview: Custom Question Playlist Creator
- **Category**: Interview Hub
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Allow students to flag specific interview questions to build a personalized study deck for custom mock sessions.

### 49. Interview: Visual Radar Chart for Technical Competency Scores
- **Category**: Interview Hub
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Integrate a radar chart using D3/Recharts summarizing candidate ratings across core metrics (e.g., Clarity, Accuracy, Depth, Delivery).

### 50. Interview: Bookmark Failed Mock Questions for Rematch
- **Category**: Interview Hub
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Automatically flag mock attempts with scores below 6/10 and display them in a "Weak Areas for Revision" list.

---

## ⚡ UI/UX, Animations & Bento Grids

### 51. UI/UX: Implement Staggered Grid Transitions on Candidate Dashboard
- **Category**: UI/UX
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Apply staggered animations to the landing dashboard elements using Motion's variants for a premium entrance feeling.

### 52. UI/UX: Interactive Slide-over Panels for Custom Task Creation
- **Category**: Dashboard
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Create a sliding drawer panel to capture details for adding new custom planner tasks instead of relying on inline inputs.

### 53. UI/UX: Dynamic Calendar Grid Switcher for Study Planners
- **Category**: Dashboard
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Build a 7-day horizontal calendar bar allowing students to view and toggle study plans for different days of the week.

### 54. UI/UX: Micro-Animations for Streak Fire Icons
- **Category**: Dashboard
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Animate the streak counter fire badge on the header to pulse and emit tiny spark particles whenever a daily task completes.

---

## ⏱️ Quantitative Aptitude Trainer

### 55. Aptitude: Pause and Resume Timer during Mock Tests
- **Category**: Aptitude
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Add a functioning Pause/Resume mechanism to the quantitative quiz interface, gracefully stopping the active countdown interval.

### 56. Aptitude: Generate Interactive Performance Graphs on Submission
- **Category**: Aptitude
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Show a pie chart reflecting correct, incorrect, and unattempted questions using Recharts upon submitting quizzes.

### 57. Aptitude: Categorized Quiz Selection Screen
- **Category**: Aptitude
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Replace the flat card layout with an organized grid where users can select specific aptitude domains (e.g., Quant, Verbal, Logical Reasoning).

### 58. Aptitude: Detailed Solutions Slide-out
- **Category**: Aptitude
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Enable candidates to expand step-by-step mathematical solutions for questions they answered incorrectly.

---

## ⚙️ Backend Routing & AI Coaching Proxies

### 59. Backend: Request Validation Middleware
- **Category**: Backend
- **Labels**: `medium`, `intermediate`, `backend`
- **Description**: Implement server-side validation middleware in `server.ts` to reject payloads lacking proper fields before calling Gemini.

### 60. Backend: Local Mock Evaluator Fallback Engine
- **Category**: Backend
- **Labels**: `medium`, `intermediate`, `backend`
- **Description**: Provide a local fallback response algorithm using basic heuristics when the server detects that the `GEMINI_API_KEY` is missing.

### 61. AI Coach: Save Generated Study Roadmaps to File System
- **Category**: AI Coach
- **Labels**: `medium`, `intermediate`, `backend`
- **Description**: Expose an API endpoint that compiles study plans into formatted files and downloads them on the client.

### 62. AI Coach: Chat Session Context History Maintainer
- **Category**: AI Coach
- **Labels**: `medium`, `intermediate`, `backend`
- **Description**: Implement a memory manager on the server proxy that appends previous thread logs to the conversational prompt history.

---

## 🧪 Testing & Code Quality

### 63. Testing: Add Unit Test Suite for Math Utilities
- **Category**: Testing
- **Labels**: `medium`, `intermediate`, `testing`
- **Description**: Write test cases for calculations such as XP levels, ATS keyword matching scores, and streak rollover timestamps.

### 64. Testing: Mock Server Requests for API Health Routes
- **Category**: Testing
- **Labels**: `medium`, `intermediate`, `testing`
- **Description**: Setup integration tests that hit `/api/health` and verify correct status fields are returned.

### 65. Code Quality: Create Dynamic Meta Component Wrappers
- **Category**: UI/UX
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Refactor layout titles and meta tags to render dynamically using standard document selectors.

### 66. Code Quality: Establish Standardized Error Boundary Panels
- **Category**: UI/UX
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Implement a custom React Error Boundary to catch render failures gracefully and display a stylized crash screen.

---

## 👥 Forums & Social Networking

### 67. Forums: Filter Forum Topics by Multiple Categorized Tags
- **Category**: Community
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Extend `Community.tsx` to allow contributors to sort posts simultaneously by tags (e.g., "Meta" AND "Sliding Window").

### 68. Forums: Rich-Text Markdown Editor for Submitting Topics
- **Category**: Community
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Integrate an interactive markdown editor that previews output live as users write new posts.

### 69. Forums: Track Upvoted Forum Posts inside Local Cache
- **Category**: Community
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Persist user upvote flags locally to prevent multiple upvotes on the same topic during fresh sessions.

### 70. Forums: Search Filter Auto-Completion Recommendations
- **Category**: Community
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Implement debounced query matchers suggesting existing community tags as the candidate types in the forum search box.

### 71. Forums: Accordion View for Deep Comment Threads
- **Category**: Community
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Build a collapsible comment box allowing users to easily hide or expand nested replies.

### 72. Forums: Export Shared Preparation Notes
- **Category**: Community
- **Labels**: `medium`, `intermediate`, `frontend`
- **Description**: Allow candidates to download curated notes segments shared on the community board directly into local note folders.
