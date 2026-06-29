# Backend API Endpoints Directory

This document details the public API routes exposed by the PrepVerse server. All routes are prefixed with `/api`.

---

## 🟢 1. Health Status check

Check if the server is booted, healthy, and responsive.

- **Endpoint**: `GET /api/health`
- **Headers**: `None`
- **Response**: `200 OK`
- **Response Format**: `application/json`

### Sample Response
```json
{
  "status": "ok",
  "time": "2026-06-29T12:27:22.123Z"
}
```

---

## 💬 2. General AI Chat Coach

Communicate directly with the PrepVerse AI coach for DSA pointers, behavioral preparation tips, or standard competitive programming strategies.

- **Endpoint**: `POST /api/gemini/chat`
- **Headers**: `Content-Type: application/json`
- **Payload Format**:
  ```json
  {
    "prompt": "Explain Morris Traversal in simple terms"
  }
  ```
- **Response**: `200 OK`
- **Response Format**: `application/json`

### Sample Response
```json
{
  "text": "### Morris Traversal\n\nMorris Traversal is an algorithm that allows you to traverse a Binary Tree in **O(N) time** and **O(1) auxiliary space**..."
}
```

---

## 📅 3. Customized Weekly Study Plan Generator

Generate a tailored 4-week calendar-style study plan based on a student's target company, daily hours, year, skill level, and coding ratings.

- **Endpoint**: `POST /api/gemini/study-plan`
- **Headers**: `Content-Type: application/json`
- **Payload Format**:
  ```json
  {
    "targetCompany": "Amazon",
    "dailyHours": "3",
    "currentYear": "3",
    "coreSkills": "Python, basic DSA",
    "currentRating": "Intermediate"
  }
  ```
- **Response**: `200 OK`
- **Response Format**: `application/json`

### Sample Response
```json
{
  "roadmap": "### Week 1: Arrays & Sliding Window\n- **Day 1-2**: Theory & active study...\n- **Target Problems**: Two Sum, 3Sum, Container with Most Water...\n- **Amazon Tip**: Focus on edge cases and optimal O(N) space complexities..."
}
```

---

## 📄 4. Resume Bullet Point Optimizer

Rewrite a bullet point following the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]" with active action verbs.

- **Endpoint**: `POST /api/gemini/resume-review`
- **Headers**: `Content-Type: application/json`
- **Payload Format**:
  ```json
  {
    "bulletPoint": "Worked on a React page to fetch user items",
    "role": "Frontend Intern",
    "techKeywords": "React, TypeScript, state optimization"
  }
  ```
- **Response**: `200 OK`
- **Response Format**: `application/json`

### Sample Response
```json
{
  "feedback": "### Optimized Segment\n- **Engineered an interactive product catalog in React and TypeScript** which reduced page load times by 24% through memoized query state caching.\n\n### Key Keywords Added\n- Engineered, Interactive Catalog, memoized query states..."
}
```

---

## 🎓 5. Mock Interview Automated Evaluator

Evaluate a candidate's answer to a technical or behavioral interview question and provide structured grading metrics.

- **Endpoint**: `POST /api/gemini/interview-grade`
- **Headers**: `Content-Type: application/json`
- **Payload Format**:
  ```json
  {
    "question": "What is the difference between SQL and NoSQL?",
    "candidateAnswer": "SQL uses schemas and is relational, NoSQL is unstructured.",
    "category": "System Design"
  }
  ```
- **Response**: `200 OK`
- **Response Format**: `application/json`

### Sample Response
```json
{
  "evaluation": "- **Score**: 7\n- **Pros**: Correctly highlighted relational schemas versus unstructured scaling.\n- **Cons**: Missed discussing ACID properties, CAP Theorem, and standard query interfaces...\n- **Standard Reference Answer**: Relational Databases (SQL) enforce ACID guarantees using strict structured schemas, whereas NoSQL..."
}
```
