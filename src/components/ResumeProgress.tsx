/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, Circle, Target } from 'lucide-react';
import type { ResumeData } from '../types';

/**
 * Represents the completion state of a single resume section.
 *
 * `id` is a stable identifier used as a React key.
 * `label` is the human-readable section name shown in the UI.
 * `complete` is the boolean result of the section's validation predicate.
 * `hint` is a short actionable instruction shown next to missing sections
 *        so the user knows exactly what to fill in to bump the progress.
 */
export interface ResumeSectionStatus {
  id: string;
  label: string;
  complete: boolean;
  hint: string;
}

/**
 * Returns a non-empty-string check used by every section predicate.
 *
 * We treat `null`, `undefined`, and whitespace-only strings as "missing".
 */
function isFilled(value: string | undefined | null): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Returns true when at least one entry in the list has its primary field
 * filled in. This prevents a section from being marked complete just
 * because an empty row was added.
 */
function hasFilledEntry<T>(
  items: T[],
  primaryField: (item: T) => string,
): boolean {
  return items.some((item) => isFilled(primaryField(item)));
}

/**
 * Computes the completion status of every top-level resume section.
 *
 * The sections and their predicates mirror the ATS compliance rules already
 * used in `ResumeStudio.tsx`, so the progress bar and the existing ATS
 * checklist cannot drift apart as the form evolves.
 *
 * Sections tracked (10 total, each worth 10%):
 *   1.  Full name
 *   2.  Email
 *   3.  Phone
 *   4.  Website / portfolio
 *   5.  GitHub
 *   6.  LinkedIn
 *   7.  Education (at least one filled entry)
 *   8.  Work experience (at least one filled entry)
 *   9.  Projects (at least one filled entry)
 *  10.  Skills (at least three skills)
 */
export function getResumeSectionStatuses(
  resume: ResumeData,
): ResumeSectionStatus[] {
  return [
    {
      id: 'fullName',
      label: 'Full Name',
      complete: isFilled(resume.fullName),
      hint: 'Add your full name so recruiters can identify you.',
    },
    {
      id: 'email',
      label: 'Email',
      complete: isFilled(resume.email),
      hint: 'Add a contact email so recruiters can reach you.',
    },
    {
      id: 'phone',
      label: 'Phone',
      complete: isFilled(resume.phone),
      hint: 'Add a phone number for direct recruiter contact.',
    },
    {
      id: 'website',
      label: 'Portfolio URL',
      complete: isFilled(resume.website),
      hint: 'Link a personal website or portfolio to showcase work.',
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      complete: isFilled(resume.github),
      hint: 'Link your GitHub profile so recruiters can review your code.',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      complete: isFilled(resume.linkedin),
      hint: 'Link your LinkedIn profile for professional context.',
    },
    {
      id: 'education',
      label: 'Education',
      complete: hasFilledEntry(resume.education, (e) => e.institution),
      hint: 'Add at least one education entry with an institution name.',
    },
    {
      id: 'experience',
      label: 'Work Experience',
      complete: hasFilledEntry(resume.experience, (e) => e.company),
      hint: 'Add at least one work experience entry with a company name.',
    },
    {
      id: 'projects',
      label: 'Projects',
      complete: hasFilledEntry(resume.projects, (p) => p.name),
      hint: 'Add at least one project with a name.',
    },
    {
      id: 'skills',
      label: 'Skills (3+)',
      complete: resume.skills.filter((s) => isFilled(s)).length >= 3,
      hint: 'Add at least three skills to round out the resume.',
    },
  ];
}

/**
 * Computes the integer percentage of completed sections, clamped to [0, 100].
 */
export function getResumeCompletionPercent(statuses: ResumeSectionStatus[]): number {
  if (statuses.length === 0) return 0;
  const completed = statuses.filter((s) => s.complete).length;
  return Math.round((completed / statuses.length) * 100);
}

interface ResumeProgressProps {
  resume: ResumeData;
}

/**
 * Renders a progress bar showing the user's overall resume completion
 * percentage, plus a list of remaining sections to complete.
 *
 * Updates dynamically whenever the `resume` prop changes — the parent
 * `ResumeStudio` already re-renders on every keystroke, so this component
 * inherits that reactivity without needing its own state.
 *
 * The layout is fully responsive:
 *   - The progress bar stretches to container width.
 *   - The missing-sections list collapses to a single column on mobile
 *     and expands to two columns on `sm:` and up.
 *   - The card uses the same dark-slate / indigo design tokens as the
 *     rest of the Resume Studio so it visually matches the existing UI.
 */
export default function ResumeProgress({ resume }: ResumeProgressProps) {
  const statuses = getResumeSectionStatuses(resume);
  const percent = getResumeCompletionPercent(statuses);
  const missing = statuses.filter((s) => !s.complete);
  const completedCount = statuses.length - missing.length;

  // Bar color shifts as completion rises, so the user gets instant visual
  // feedback that they are making progress rather than seeing one flat hue.
  const barColor =
    percent >= 80
      ? 'bg-emerald-500'
      : percent >= 50
        ? 'bg-indigo-500'
        : percent >= 25
          ? 'bg-amber-500'
          : 'bg-rose-500';

  const barTextColor =
    percent >= 80
      ? 'text-emerald-400'
      : percent >= 50
        ? 'text-indigo-400'
        : percent >= 25
          ? 'text-amber-400'
          : 'text-rose-400';

  return (
    <div
      className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4"
      role="region"
      aria-label="Resume completion progress"
    >
      {/* Header: percentage + completed count */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Resume Completion
          </h3>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-black tracking-tight ${barTextColor}`}>
            {percent}%
          </span>
          <p className="text-[10px] text-slate-500">
            {completedCount}/{statuses.length} sections complete
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="relative h-3 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Resume completion percentage"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Completion message */}
      {percent === 100 ? (
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          <span>Your resume is fully filled out. Ready to export!</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Circle className="w-4 h-4 text-slate-500" aria-hidden="true" />
          <span>
            {missing.length} {missing.length === 1 ? 'section' : 'sections'} left
            to complete your resume.
          </span>
        </div>
      )}

      {/* Missing sections list (only shown when incomplete) */}
      {missing.length > 0 && (
        <div className="pt-2 border-t border-slate-850">
          <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
            Missing Sections
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {missing.map((section) => (
              <li
                key={section.id}
                className="flex items-start gap-2 text-xs text-slate-400"
              >
                <Circle
                  className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-slate-300 font-semibold">{section.label}</p>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    {section.hint}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
