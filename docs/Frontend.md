# Frontend Development Guidelines

This document outlines the design language, styling philosophies, and React component architectures used throughout PrepVerse.

---

## 🎨 Design Philosophy & Theming

PrepVerse maintains a clean, modern, high-contrast user interface that focuses on focus and legibility.

- **Color Palette**: 
  - Standard Dark Theme: Slate-950 (`bg-slate-950`) as the canvas background, combined with Slate-900 transparent cards (`bg-slate-900/40`) and Slate-800 borders (`border-slate-800/40`).
  - Text: Standard white titles (`text-white`) with Slate-400 descriptions (`text-slate-400`).
- **Typography**:
  - Primary UI text uses **Inter** (sans-serif) for high legibility.
  - Code modules and status indicators use **JetBrains Mono** or **Fira Code** for tech-forward readability.
- **Visual Rhythm**: Use a combination of rounded card corners (`rounded-3xl` or `rounded-2xl`) and spacious padding (`p-6` or `p-8`) to maintain a clean layout with ample negative space. Avoid clutter.

---

## 🏗️ State Management Rules

- **Shared State**: Global variables (such as `userStats` and `theme`) are initialized in `src/App.tsx` and passed down as props to child modules.
- **Component Side-Effects**: When modifying parent state, always ensure updates do not cause infinite re-renders. Do not call State-setters directly inside the render loop or inside state-updaters of other states. Maintain clean state updates.
- **Transitions & Motion**: Custom animations must use **Motion** (imported from `motion/react`) for smooth, hardware-accelerated transitions.

---

## 🏷️ Reusable Component Registry

When creating or modifying frontend components:
- **Responsive prefixes**: Ensure grids adapt using `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` to handle ultra-wide screens as well as mobile devices smoothly.
- **Icons**: Every icon MUST be imported from `lucide-react`. Custom SVGs or third-party image elements are forbidden.
- **Interactive States**: Always include appropriate hover effects (`hover:bg-slate-900`, `transition-all`) and touch targets of at least `44px` on mobile wrappers.
