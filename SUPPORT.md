# Contributor Support Guide

Welcome! We are incredibly thrilled that you are contributing to PrepVerse. If you run into issues, have questions, or need guidance on coding tasks, please refer to the support channels below.

---

## 💬 Instant Chat Rooms

For quick help, general chat, or pairing up with other open-source contributors, join our Discord server:

👉 **[Join our Discord Server](https://discord.gg/prepverse)**

Once inside:
- `#announcements`: For updates on GSOC, GSSOC, or community programs.
- `#general-dev`: For general frontend or backend implementation questions.
- `#ai-coach`: For discussing the Google Gen AI integrations.
- `#first-timers`: Specifically dedicated to helping new open-source contributors submit their very first pull request!

---

## 📋 GitHub Discussions

For long-form design ideas, RFCs, feature feedback, or questions that don't need immediate real-time responses, please use GitHub Discussions:

👉 **[Go to GitHub Discussions](https://github.com/prepverse/prepverse/discussions)**

We categorize discussions into:
- 💡 **Ideas**: Pitch brand new features or UI concepts.
- ❓ **Q&A**: Ask how to configure certain files or get help with a compiler warning.
- 🙌 **Showcase**: Share your working pull requests, custom themes, or screenshots of your work!

---

## ✉️ Email Support

If you have a private concern, administrative inquiry regarding open-source programs (like Google Summer of Code), or need to report a code-of-conduct violation, please reach out to the core maintainers via:

📧 **support@prepverse.dev**

---

## 🔍 Frequently Answered Questions (FAQs)

### How do I start the local environment?
Run `npm install` and then `npm run dev` to boot both the Vite frontend compiler and the Express API proxy simultaneously. The application will be accessible at `http://localhost:3000`.

### Why does my AI evaluation keep failing?
Ensure you have created a `.env` file in the root directory and populated it with `GEMINI_API_KEY=your_key_here`. See `docs/AI.md` for more details.

### How do I claim an open bounty or issue?
Comment on the specific issue in the tracker (e.g., `"I would like to claim this issue as part of GSSOC"`) and wait for a maintainer to assign it to you before submitting a PR.
