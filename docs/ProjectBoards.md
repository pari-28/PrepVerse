# GitHub Project Boards & Agile Process

To organize contributions and streamline development under programs like GSoC and GSSoC, PrepVerse uses GitHub Project boards. This file documents the standard agile columns and issue lifecycle.

---

## 📋 Kanban Board Columns

Our GitHub Project board is divided into five main columns tracking tasks from inception to completion:

### 1. 📂 Backlog
- **Status**: Ideas, proposed enhancements, and newly filed bugs that require triage.
- **Entry Criteria**: Any opened issue automatically lands here.
- **Action**: Maintainers review issues in this column, apply appropriate difficulty labels (e.g., `easy`, `medium`, `hard`), and determine if they align with the project scope.

### 2. 🎯 Ready
- **Status**: Triaged, verified, and well-documented issues that are ready to be claimed.
- **Entry Criteria**: Issue has clear acceptance criteria, is labeled, and has been approved by a maintainer.
- **Action**: Open-source contributors search this column for issues labeled `good first issue` or `help wanted` and request assignment.

### 3. ⚙️ In Progress
- **Status**: Active development is underway.
- **Entry Criteria**: Issue is assigned to a contributor, and a corresponding branch has been created.
- **Action**: The contributor works on implementing the solution or writing the requested documentation.

### 4. 👀 Review / QA
- **Status**: Code changes have been submitted as a Pull Request and are awaiting maintainer reviews or automated tests.
- **Entry Criteria**: A Pull Request is opened and linked to the corresponding issue (e.g., using `Closes #123`).
- **Action**: Maintainers check code styling, verify linter/build outcomes, and provide feedback. Contributors address any requested changes.

### 5. ✅ Done
- **Status**: The changes have been successfully reviewed, approved, and merged into the active development branch.
- **Entry Criteria**: Pull Request is merged into the `develop` or `main` branches.
- **Action**: The task is finalized, XP rewards are credited, and the issue is closed.
