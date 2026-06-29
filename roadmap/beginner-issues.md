# Beginner Roadmap Issues

These issues are designed specifically for first-time open-source contributors and junior developers. They are tagged with **good first issue**, **beginner**, and **easy**.

---

## 🛠️ UI/UX & Styling

### 1. Style: Standardize Hover Tooltips on Header Icons
- **Category**: UI/UX
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Add tooltip bubbles to navigation bar headers (such as Theme Toggle, Profile Settings) explaining their exact functions on cursor hover.

### 2. Style: Apply Subtle Scaling Transitions to Activity Grid Cards
- **Category**: UI/UX
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Introduce a smooth transition when cards on the main Candidate Dashboard are hovered (`hover:scale-[1.02] transition-transform`).

### 3. Style: Refine Active States on Code Sandbox Sidebar Tabs
- **Category**: DSA
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Highlight active tab indicators under the code execution sidebar (e.g., Description, Video, Notes) with a high-contrast border and custom text color.

### 4. Style: Custom Scrollbar for Long Code Editorial Text
- **Category**: DSA
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Standardize the scrollbar style on code panels to match the overall dark-slate layout theme.

### 5. Style: Customize Empty-State Visuals inside Community Forums
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Show a clean, centered graphic or text block when a user's search query on the forum yields zero matching topics.

### 6. Style: Smooth Carousel Slide Transition on Hero Banner
- **Category**: UI/UX
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Integrate subtle entry animations using Motion on landing page headers.

### 7. Style: High-Contrast Active Navigation Sidebar Indicators
- **Category**: UI/UX
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Give active menu paths in `Navigation.tsx` a left accent border matching the theme color.

### 8. Style: Format XP Reward Counters on Aptitude Completion
- **Category**: Aptitude
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Render earned XP counters with a high-impact flashing text color (e.g., green/amber) when an aptitude test is successfully submitted.

---

## 🌐 Accessibility & Responsiveness

### 9. Accessibility: Add Missing ARIA Labels to Navigation Menu Buttons
- **Category**: Accessibility
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Ensure screen readers can describe side rails by appending `aria-label="Toggle Navigation"` or similar attributes.

### 10. Accessibility: Support Dark-Theme Keyboard Focus Outlines
- **Category**: Accessibility
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Add high-contrast blue focus states (`focus-visible:ring-2`) to inputs on the Candidate Settings page for tab-key accessibility.

### 11. Accessibility: Screen Reader Warnings for Time-Boxed Tests
- **Category**: Accessibility
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Implement standard aria-live tags alerting visually impaired candidates when the aptitude countdown timer is below 10 seconds.

### 12. Accessibility: Enforce Proper Font Contrast in Empty Settings Forms
- **Category**: Accessibility
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Increase placeholder text opacity under textboxes on the Candidate Profile settings page.

### 13. Responsiveness: Collapsible Layout Adjustments for Tablet Widths
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Prevent text truncation on dashboard panels when viewed at widths between 768px and 1024px.

### 14. Responsiveness: Wrap Long Company Tags on DSA Cards
- **Category**: DSA
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Flex-wrap company badges on problems list cards to avoid horizontal overflow on mobile viewports.

### 15. Responsiveness: Sticky Top Bar on Mobile Viewports
- **Category**: UI/UX
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Ensure the header containing the burger menu remains sticky at the top when scrolling through long interview simulations.

---

## 📝 Documentation & Copywriting

### 16. Documentation: Typo Clean-up in Quantitative Aptitude Databases
- **Category**: Documentation
- **Labels**: `good first issue`, `beginner`, `easy`, `documentation`
- **Description**: Proofread and repair spelling errors inside question datasets under `src/data/aptitudeData.ts`.

### 17. Documentation: Add Comments Explaining Mock Evaluator System Prompts
- **Category**: Documentation
- **Labels**: `good first issue`, `beginner`, `easy`, `documentation`
- **Description**: Add descriptive code comments above prompts inside `server.ts` to aid future AI integrations.

### 18. Documentation: Detail Contribution Workflows inside CONTRIBUTING.md
- **Category**: Documentation
- **Labels**: `good first issue`, `beginner`, `easy`, `documentation`
- **Description**: Append step-by-step guidance on creating branch names and linking issues inside pull requests.

### 19. Documentation: Document Theme Color Theme Customization Variable Lists
- **Category**: Documentation
- **Labels**: `good first issue`, `beginner`, `easy`, `documentation`
- **Description**: Maintain an explicit markdown list detailing standard Tailwind theme utility variables for future dark/light customizations.

### 20. Copy: Polish Success Alert Copy after Profile Updates
- **Category**: UI/UX
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Rephrase the success alerts on candidate settings forms to feel more encouraging and professional.

### 21. Documentation: Add Inline Developer JSDoc Tags above UserStats Schema
- **Category**: Documentation
- **Labels**: `good first issue`, `beginner`, `easy`, `documentation`
- **Description**: Add JSDoc annotations above `UserStats` properties in `src/types.ts` detailing what XP and completedToday affect.

### 22. Copy: Update DSA Blank-Notes Text Placeholder
- **Category**: DSA
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Revise the default notes textbox placeholder to suggest writing space/time complexities.

---

## 🧪 Testing & Code Quality

### 23. Testing: Create Baseline Smoke Tests for Types Definitions
- **Category**: Testing
- **Labels**: `good first issue`, `beginner`, `easy`, `testing`
- **Description**: Verify that the application imports `UserStats` without compilation errors using basic smoke scripts.

### 24. Code Quality: Remove Obsolete CSS Rules in index.css
- **Category**: UI/UX
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Search for and delete unreferenced raw CSS classes or duplicated tailwind rules.

### 25. Code Quality: Consolidate Common Mock Curricula Arrays
- **Category**: DSA
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Move hardcoded tag arrays (e.g. Amazon, Google badges) into a clean, unified config file.

### 26. Testing: Add Mock Validation Checks for Custom Problem Inputs
- **Category**: Testing
- **Labels**: `good first issue`, `beginner`, `easy`, `testing`
- **Description**: Build unit checks validating that the custom problem titles appended by moderators contain valid text characters.

---

## 📦 Features & Functionality Extensions

### 27. Feature: Add Clear Search Input Button in Forums
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Insert a subtle 'X' icon inside the search input of `Community.tsx` to clear search criteria in one click.

### 28. Feature: Display Current Local Time in Admin Console
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Append a live UTC/local time element to the administrative page margin for session context.

### 29. Feature: Provide Pre-populated Copy Tags on Open-Source Shell Scripts
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Introduce 'Copy Code' clipboard icons next to setup commands in `OpenSourceMeta.tsx`.

### 30. Feature: Implement Difficulty Badges on Interview Cards
- **Category**: Interview Hub
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Add color-coded indicators for Easy, Medium, and Hard behavioral questions on selection drawers.

### 31. Feature: Display Selected Company Filters dynamically
- **Category**: DSA
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Render active filters above the DSA problems table to make active search states highly obvious.

### 32. Feature: Visual Sparklines for Active Streak Count
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Render small sparkline-style dots on the daily progress card representing the 6-day streak history.

### 33. Feature: Track Saved Resumes Local Count
- **Category**: Resume Studio
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Show a small badge counter reflecting how many bullet segment optimizations have been executed during the current session.

### 34. Feature: Provide Confirmation Prompts on Settings Clear
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Integrate clean, styled confirm prompts when users click "Purge Local Storage" to avoid accidental resets.

### 35. Feature: Allow Selection of Core Coding Language
- **Category**: Settings
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Introduce a programming language selection dropdown (TypeScript, Python, C++) inside Settings.

### 36. Feature: Render Contributor Avatar placeholders
- **Category**: Dashboard
- **Labels**: `good first issue`, `beginner`, `easy`, `frontend`
- **Description**: Use high-contrast CSS initials badges for community forum posts that lack profile images.
