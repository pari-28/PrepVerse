/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ponytail: pure framework-agnostic business rules extracted from ResumeStudio.
// No React / Vite / DOM imports here — fully unit-testable in isolation.

import type { ResumeData } from '../types';

export interface AtsCheck {
  label: string;
  passed: boolean;
}

export interface AtsReport {
  score: number;
  checks: AtsCheck[];
}

/**
 * Validators for common resume fields.
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string): boolean =>
  /^\+?[1-9]\d{7,14}$/.test(phone.replace(/[\s()-]/g, ""));

export const isValidGithub = (url: string): boolean =>
  /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/.test(url.trim());

export const isValidLinkedIn = (url: string): boolean =>
  /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?$/.test(url.trim());

export const isValidPortfolio = (url: string): boolean =>
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/.*)?$/.test(url.trim());

/**
 * Computes the ATS compliance score + checklist for a resume.
 * Pure function: identical input => identical output, no side effects.
 */
export const computeAtsScore = (resume: ResumeData): AtsReport => {
  const checks: AtsCheck[] = [
    {
      label: 'Has GitHub profile linked',
      passed: isValidGithub(resume.github),
    },
    {
      label: 'Has LinkedIn profile linked',
      passed: isValidLinkedIn(resume.linkedin),
    },
    {
      label: 'Has Phone and Email listed',
      passed: isValidPhone(resume.phone) && isValidEmail(resume.email),
    },
    {
      label: 'At least 5 core technical skills',
      passed: resume.skills.length >= 5,
    },
    {
      label: 'At least 1 detailed project',
      passed: resume.projects.length >= 1,
    },
    {
      label: 'Professional work experience listed',
      passed: resume.experience.length >= 1,
    },
    {
      label: 'Education details listed',
      passed: resume.education.length >= 1,
    },
  ];

  const passedCount = checks.filter(c => c.passed).length;
  const computedScore = Math.round((passedCount / checks.length) * 100);

  return { score: computedScore, checks };
};

/**
 * Awards XP + daily-goal progress based on an interview score.
 * Mirrors the scoring rule previously inlined in InterviewHub.
 */
export const computeInterviewXp = (score: number): number => score * 30;

/**
 * Awards XP + daily-goal progress for completing a planner task.
 * Mirrors the scoring rule previously inlined in Dashboard.
 */
export const computeTaskXp = (completed: boolean): number => (completed ? 50 : -50);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
