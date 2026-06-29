# Contributing to PrepVerse 🤝

We are thrilled that you want to contribute to PrepVerse! Whether you are fixing a bug, adding a new DSA problem, improving the ATS resume builder, or enhancing the AI coach, your help makes PrepVerse better for everyone.

---

## 🗺️ Contribution Frameworks (GSoC, GSSoC, etc.)

If you are participating as part of **Google Summer of Code (GSoC)**, **GSSoC**, **ECSoC**, or other open-source initiatives:
1. **Explore Curated Issues**: Check our pre-designed issues list under `roadmap/` to find a task matching your skill level:
   - 🟢 [Beginner Roadmap](./roadmap/beginner-issues.md) (Simple styling, accessibility, typos)
   - 🟡 [Intermediate Roadmap](./roadmap/intermediate-issues.md) (Interactive cards, math modules, state sync)
   - 🔴 [Advanced Roadmap](./roadmap/advanced-issues.md) (WebSockets, Cloud persistence, Live audio AI)
2. **Read the Docs**: Read through the [Getting Started Onboarding Guide](./docs/GettingStarted.md) first to get familiar with our module codebases.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it to ensure a welcoming and inclusive environment.

---

## How Can I Contribute?

### 1. Reporting Bugs 🐛
- Search existing issues to see if the bug has already been reported.
- If not, open a new issue using our standard templates.
- Provide a clear, descriptive title, step-by-step reproduction steps, and console logs.

### 2. Suggesting Enhancements ✨
- Open an issue explaining the proposed feature and why it would be valuable.
- Participate in discussions on existing feature requests.

### 3. Pull Requests (PRs) 🚀
- Fork the repository.
- Create a new branch from `develop` (our active development branch):
  ```bash
  git checkout -b feature/issue-title
  # or
  git checkout -b fix/issue-number-bug-name
  ```
- Make your changes, adhering to our coding standards.
- Run typechecking, lints, and smoke tests locally to ensure no regressions:
  ```bash
  npm run lint
  npm test
  ```
- Commit your changes using descriptive commit messages:
  ```bash
  git commit -m "feat: integrate gemini resume reviewer suggestion panel"
  ```
- Push to your fork and submit a Pull Request to the `develop` branch.

---

## Coding Guidelines

- **TypeScript**: Ensure all parameters and return values are fully typed. Avoid using `any`.
- **Styling**: Use utility Tailwind CSS classes directly. Follow our consistent dark theme layout and visual patterns.
- **Components**: Write modular, reusable functional components inside `src/components/`. Keep layout concerns decoupled.
- **Data Stores**: If adding new DSA sheets, interview prompts, or company cards, modify the corresponding file in `src/data/` instead of hardcoding values inside UI files.

---

## Pull Request Guidelines

- Fill out the provided [Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.md) completely.
- Keep PRs focused. Do not combine unrelated features or refactoring into a single PR.
- Ensure your branch is up-to-date with `develop` before submitting.
- Link the relevant issue number (e.g. `Closes #123`) in the PR description.
