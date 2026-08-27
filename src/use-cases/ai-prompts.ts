/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ponytail: pure framework-agnostic prompt builders extracted from the
// Express /api/gemini/* routes in server.ts. No Express imports — fully testable.

// --- Security: prompt-injection blocklist (mirrors server.ts middleware) ---

const PROMPT_INJECTION_BLOCKLIST = [
  'ignore previous instructions',
  'ignore all previous',
  'print your system prompt',
  'system instruction',
  'developer mode enabled'
];

/** True when the payload contains prompt-injection markers. */
export const hasMaliciousContent = (value: unknown): boolean => {
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    return PROMPT_INJECTION_BLOCKLIST.some(phrase => lower.includes(phrase));
  }
  if (typeof value === 'object' && value !== null) {
    return Object.values(value).some(v => hasMaliciousContent(v));
  }
  return false;
};

const MAX_PAYLOAD_BYTES = 10000;

/** True when JSON-stringified payload exceeds the size ceiling. */
export const isPayloadTooLarge = (body: unknown): boolean =>
  JSON.stringify(body).length > MAX_PAYLOAD_BYTES;

// --- Prompt builders: framework-agnostic, no Express types ---

export interface StudyPlanParams {
  targetCompany?: string;
  dailyHours?: string;
  currentYear?: string;
  coreSkills?: string;
  currentRating?: string;
}

export interface ResumeReviewParams {
  bulletPoint: string;
  role?: string;
  techKeywords?: string;
}

export interface InterviewGradeParams {
  question: string;
  candidateAnswer: string;
  category?: string;
}

const COACH_SYSTEM_INSTRUCTION = `You are PrepVerse AI Coach, an expert tech recruiter and elite competitive coder.
Help the student prepare for placements and internships. Keep answers highly professional, actionable, structured with markdown, and direct. Avoid generic, flowery text. Refer to the student's preparation goals when helpful.`;

const STUDY_PLAN_SYSTEM_INSTRUCTION =
  'You are an elite placement coordinator who builds concrete, calendar-style weekly roadmap plans. Never return empty boxes or placeholders.';

const RESUME_REVIEW_SYSTEM_INSTRUCTION =
  'You are an expert resume consultant who works with candidates applying to Ivy League tech companies and top tier startups. Keep it precise and high impact.';

const INTERVIEW_GRADE_SYSTEM_INSTRUCTION =
  'You are an engineering manager grading technical candidates. Be constructive, strict, and precise in your grading scale. Award higher scores only for comprehensive, structurally sound answers.';

export const chatSystemInstruction = COACH_SYSTEM_INSTRUCTION;

export const buildStudyPlanPrompt = (params: StudyPlanParams): string =>
  `Create a highly tailored 4-week placement study roadmap for a student with these parameters:
- **Target Company**: ${params.targetCompany || 'Top Product Companies'}
- **Daily Prep Budget**: ${params.dailyHours || '2'} hours/day
- **Current Standing**: Year ${params.currentYear || '3'} student
- **Current LeetCode/Coding Rating**: ${params.currentRating || 'Beginner'}
- **Current Core Skillset**: ${params.coreSkills || 'C++, Data Structures'}

Break down the roadmap week-by-week. For each week specify:
1. Core Topics (e.g., Arrays, Sliding Window, Trees, System Design)
2. Daily hour breakdown (e.g., Day 1-2: Theory, Day 3-5: Sheet Problems, Day 6: Mock, Day 7: Revision)
3. 3 Specific problems to target
4. Crucial Tip for cracking ${params.targetCompany || 'Product Companies'} interviews.

Return the response in well-formatted Markdown with standard headers.`;

export const buildResumeReviewPrompt = (params: ResumeReviewParams): string =>
  `Review and optimize the following resume bullet point or project description to maximize its ATS matching score and impact.
Targeting Role: ${params.role || 'Software Engineering Intern'}
Preferred Keywords to incorporate: ${params.techKeywords || 'React, Node, TypeScript, Performance, Scale'}

Original Resume Segment:
"${params.bulletPoint}"

Provide your feedback in three concise blocks:
1. **Optimized Segment**: Rewritten bullet point following the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]" with active action verbs.
2. **Key Keywords Added**: List of crucial terms integrated.
3. **Aesthetic Impact Tip**: Why this is more convincing to a tech recruiter.`;

export const buildInterviewGradePrompt = (params: InterviewGradeParams): string =>
  `Evaluate this candidate's response to the technical/behavioral interview question:
- **Category**: ${params.category || 'Core Computer Science'}
- **Question**: ${params.question}
- **Candidate Answer**: "${params.candidateAnswer}"

Provide a detailed evaluation structured as follows:
- **Score**: [Provide a numerical integer score from 1 to 10]
- **Pros / What went well**: [State what key terms or concepts they explained correctly]
- **Cons / Missing details**: [Highlight any errors, vagueness, or missing industry standards]
- **Standard Reference Answer**: [Give a concise, ideal model answer incorporating proper technical terms]`;

export const studyPlanConfig = () => ({
  systemInstruction: STUDY_PLAN_SYSTEM_INSTRUCTION,
  temperature: 0.2,
});

export const resumeReviewConfig = () => ({
  systemInstruction: RESUME_REVIEW_SYSTEM_INSTRUCTION,
  temperature: 0.3,
});

export const interviewGradeConfig = () => ({
  systemInstruction: INTERVIEW_GRADE_SYSTEM_INSTRUCTION,
  temperature: 0.2,
});

export const chatConfig = () => ({
  systemInstruction: COACH_SYSTEM_INSTRUCTION,
  temperature: 0.7,
});
