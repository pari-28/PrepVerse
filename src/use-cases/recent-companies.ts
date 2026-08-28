/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ponytail: pure logic for the "recently viewed companies" feature.
// Storage is isolated to localStorage so components stay free of it.

export interface CompanyIdent {
  id: string;
  name: string;
  logo: string;
}

export interface CompanyRecentView extends CompanyIdent {
  viewedAt: number;
}

const STORAGE_KEY = 'prepverse_recent_companies';
const MAX_RECENT = 5;

// Pure: move `company` to the front, drop duplicates (by id), cap to MAX_RECENT.
// Most-recent access is first; no duplicate ids ever present.
export function pushRecent(
  list: CompanyRecentView[],
  company: CompanyIdent,
  max = MAX_RECENT
): CompanyRecentView[] {
  const now = Date.now();
  const without = list.filter((c) => c.id !== company.id);
  return [{ ...company, viewedAt: now }, ...without].slice(0, max);
}

export function getRecentCompanies(): CompanyRecentView[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Defensive: only keep well-formed entries with an id + name.
    return Array.isArray(parsed)
      ? parsed.filter(
          (c): c is CompanyRecentView =>
            c && typeof c.id === 'string' && typeof c.name === 'string'
        )
      : [];
  } catch {
    return [];
  }
}

export function recordRecentCompany(company: CompanyIdent): CompanyRecentView[] {
  const next = pushRecent(getRecentCompanies(), company);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode / quota) — keep the in-memory result.
  }
  return next;
}
