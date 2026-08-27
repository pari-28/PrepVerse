/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ponytail: pure framework-agnostic business rules for parsing the Gemini
// interview-grading text response. No React / DOM imports — fully testable.

export interface ParsedEvaluation {
  score: number;
  pros: string[];
  cons: string[];
  reference: string;
  rawText: string;
}

/**
 * Extracts the numerical score (1-10) from the raw Gemini text.
 * Defaults to 5 if no score marker is found.
 */
export const extractScore = (rawText: string): number => {
  const scoreMatch =
    rawText.match(/Score:\s*(\d+)/i) || rawText.match(/\*\*Score\*\*:\s*(\d+)/i);
  return scoreMatch ? parseInt(scoreMatch[1], 10) : 5;
};

/**
 * Splits the raw Gemini evaluation text into structured sections.
 * Mirrors the line-by-line parsing previously inlined in InterviewHub.
 */
export const parseEvaluation = (rawText: string, fallbackAnswer: string): ParsedEvaluation => {
  const score = extractScore(rawText);

  const pros: string[] = [];
  const cons: string[] = [];
  let reference = '';

  const lines = rawText.split('\n');
  let currentSection: 'pros' | 'cons' | 'ref' | 'none' = 'none';

  lines.forEach((line: string) => {
    if (line.toLowerCase().includes('pros') || line.toLowerCase().includes('went well')) {
      currentSection = 'pros';
    } else if (line.toLowerCase().includes('cons') || line.toLowerCase().includes('missing')) {
      currentSection = 'cons';
    } else if (line.toLowerCase().includes('reference') || line.toLowerCase().includes('model answer')) {
      currentSection = 'ref';
    } else if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
      const bulletText = line.replace(/^[\s*-]+/, '').trim();
      if (currentSection === 'pros') pros.push(bulletText);
      if (currentSection === 'cons') cons.push(bulletText);
    } else if (currentSection === 'ref') {
      reference += line + '\n';
    }
  });

  return {
    score,
    pros: pros.length === 0 ? ['Strong core definitions provided by candidate.'] : pros,
    cons: cons.length === 0 ? ['Verify edge case scenarios and scaling performance variables.'] : cons,
    reference: (reference || fallbackAnswer).trim(),
    rawText,
  };
};

/**
 * Awards XP for completing an interview evaluation: score * 30.
 */
export const xpForInterviewScore = (score: number): number => score * 30;

/**
 * Caps completedToday progress so it never exceeds the daily goal.
 */
export const nextCompletedToday = (current: number, dailyGoal: number): number =>
  Math.min(dailyGoal, current + 1);
