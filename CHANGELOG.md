# Changelog

All notable changes to the **PrepVerse** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-06-29

### Added
- Created a robust Administrative Management Panel for real-time problem additions and moderation of the curriculum registry.
- Created the Open Source Contribution Hub showcasing repository setups, bounty trackers, licensing models, and code of conduct cards.
- Integrated standard GitHub Issue Templates (`feature_request.md`, `documentation.md`, `question.md`) and Pull Request Template.
- Created `ROADMAP.md` mapping out future milestones (Phase 1 through Phase 4).
- Added comprehensive documentation directory `docs/` with detailed modular architecture, frontend layouts, folder structure, and deployment strategies.
- Added GitHub action workflows (`lint.yml`, `test.yml`) to ensure automatic lint and build verification.
- Added comprehensive roadmap planning directories containing over 100 well-defined issues categorized for beginners, intermediate, and advanced open-source contributors.

### Fixed
- Fixed critical state updater bug in the Dashboard component causing infinite re-renders on planner task completions by moving parent-state updates outside of the local state updater loop.
- Fixed TypeScript type mismatches in candidate profile stats and the community forum post interfaces.

---

## [1.0.0] - 2026-06-15

### Added
- Launched PrepVerse beta with core full-stack features.
- Dynamic Candidate Dashboard with integrated daily checklists and study statistics.
- Interactive DSA Module with active code sandbox, compilers, and mock execution terminal.
- Resume Studio for instant, customized, and AI-powered layout recommendations.
- Interactive Interview Hub for analyzing and reviewing common behavioral/technical questions.
- Time-boxed Aptitude Trainer with automatic scoring and detailed feedback.
- Clean typography and responsive design using Tailwind CSS and Lucide-react icons.
