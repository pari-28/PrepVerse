# Security Policy

## Supported Versions

Only the latest major version of PrepVerse receives security updates. Please ensure you are running the most up-to-date version from the `main` branch.

| Version | Supported |
| :--- | :--- |
| v1.x | v1.1.x (Active) |
| v0.x | ❌ No longer supported |

## Reporting a Vulnerability

We take the security of PrepVerse extremely seriously. If you find a security vulnerability, please **do not** open a public GitHub issue. Doing so risks exposing the issue to exploitation before we can publish a patch.

Instead, please report security vulnerabilities by following these steps:

1. **Email Us**: Send a detailed report to **security@prepverse.dev** (or contact the maintainers directly through official channels).
2. **Details to Include**:
   - A description of the vulnerability.
   - The affected component or URL endpoint (e.g., AI integration, file uploading, user stats state).
   - A proof-of-concept (PoC) or step-by-step instructions to reproduce the issue.
   - Potential impact on candidates or servers.

3. **Response Time**: We will acknowledge receipt of your report within **48 hours** and provide a preliminary timeline for a fix. We ask that you practice responsible disclosure and give us up to **30 days** to remediate the vulnerability before public disclosure.

## Preferred Key / Encryption

If you prefer to encrypt your report, please let us know in a brief initial email, and we will share our GPG public key.

## Exclusions & Scope
Please note that security issues arising from third-party APIs (such as the Google Gen AI API key) being leaked due to user negligence (e.g., checking `.env` files into public repos) are outside of the repository's security scope. Please protect your API keys diligently!
