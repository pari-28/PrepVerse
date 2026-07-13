/**
 * ATS Resume Analyzer Engine
 * --------------------------------
 * Pure TypeScript — no React/Vite dependencies.
 * Takes raw resume text, returns a full AnalysisResult.
 *
 * @license SPDX-License-Identifier: Apache-2.0
 */

export type Severity = "critical" | "warning" | "info" | "good";

export interface CategoryScore {
  id: string;
  label: string;
  description: string;
  score: number;
  weight: number;
  contribution: number;
  findings: Finding[];
}

export interface Finding {
  severity: Severity;
  message: string;
}

export interface SectionInfo {
  name: string;
  present: boolean;
  startLine?: number;
  matchedHeading?: string;
}

export interface Suggestion {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
  action: string;
}

export interface AtsCheck {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
}

export interface KeywordMatch {
  keyword: string;
  count: number;
}

export interface AnalysisResult {
  overallScore: number;
  grade: string;
  gradeColor: string;
  wordCount: number;
  categories: CategoryScore[];
  sections: SectionInfo[];
  missingSections: SectionInfo[];
  suggestions: Suggestion[];
  atsChecks: AtsCheck[];
  topKeywords: KeywordMatch[];
  stats: {
    bulletPoints: number;
    actionVerbs: number;
    quantifiedAchievements: number;
    passivePhrases: number;
    buzzwords: number;
  };
}

// Knowledge bases

const SECTION_PATTERNS: { name: string; patterns: RegExp[] }[] = [
  { name: "Contact", patterns: [/^contact\s*(information|details)?\s*$/i] },
  {
    name: "Summary",
    patterns: [
      /^(\s*)(professional\s+)?(summary|profile|objective|about\s+me|career\s+summary)\s*[:\-]?\s*$/i,
      /^(\s*)summary\s+of\s+qualifications\s*[:\-]?\s*$/i,
    ],
  },
  {
    name: "Experience",
    patterns: [
      /^(\s*)(work\s+)?experience\s*[:\-]?\s*$/i,
      /^(\s*)professional\s+experience\s*[:\-]?\s*$/i,
      /^(\s*)employment\s+(history|experience)\s*[:\-]?\s*$/i,
      /^(\s*)work\s+history\s*[:\-]?\s*$/i,
      /^(\s*)career\s+history\s*[:\-]?\s*$/i,
    ],
  },
  {
    name: "Education",
    patterns: [
      /^(\s*)education\s*[:\-]?\s*$/i,
      /^(\s*)academic\s+background\s*[:\-]?\s*$/i,
      /^(\s*)educational\s+(background|qualifications)\s*[:\-]?\s*$/i,
    ],
  },
  {
    name: "Skills",
    patterns: [
      /^(\s*)(technical\s+)?skills\s*[:\-]?\s*$/i,
      /^(\s*)(core\s+)?competencies\s*[:\-]?\s*$/i,
      /^(\s*)technical\s+proficiency\s*[:\-]?\s*$/i,
      /^(\s*)technologies\s*[:\-]?\s*$/i,
    ],
  },
  {
    name: "Projects",
    patterns: [
      /^(\s*)projects\s*[:\-]?\s*$/i,
      /^(\s*)(key\s+)?projects\s*[:\-]?\s*$/i,
      /^(\s*)notable\s+projects\s*[:\-]?\s*$/i,
    ],
  },
  {
    name: "Certifications",
    patterns: [
      /^(\s*)certifications?\s*[:\-]?\s*$/i,
      /^(\s*)licenses?\s*(and\s+certifications?)?\s*[:\-]?\s*$/i,
      /^(\s*)professional\s+development\s*[:\-]?\s*$/i,
    ],
  },
  {
    name: "Awards",
    patterns: [
      /^(\s*)awards?\s*(and\s+honors?)?\s*[:\-]?\s*$/i,
      /^(\s*)honors?\s*[:\-]?\s*$/i,
      /^(\s*)achievements\s*[:\-]?\s*$/i,
    ],
  },
  { name: "Languages", patterns: [/^(\s*)languages?\s*[:\-]?\s*$/i] },
  {
    name: "Publications",
    patterns: [/^(\s*)publications?\s*[:\-]?\s*$/i, /^(\s*)research\s*[:\-]?\s*$/i],
  },
];

const REQUIRED_SECTIONS = ["Contact", "Summary", "Experience", "Education", "Skills"];
const OPTIONAL_SECTIONS = ["Projects", "Certifications", "Awards", "Languages", "Publications"];

const ACTION_VERBS = [
  "accelerated","accomplished","achieved","administered","analyzed","architected","built",
  "championed","collaborated","communicated","compiled","completed","conceptualized",
  "conducted","configured","consolidated","coordinated","created","decreased","delivered",
  "designed","developed","directed","drove","earned","eliminated","engineered","enhanced",
  "established","evaluated","executed","expanded","exported","facilitated","founded",
  "generated","implemented","improved","increased","initiated","inspired","installed",
  "introduced","invented","launched","led","managed","marketed","maximized","mentored",
  "negotiated","operated","optimized","orchestrated","organized","overhauled","oversaw",
  "participated","performed","pioneered","planned","produced","programmed","promoted",
  "proposed","published","rebuilt","reduced","released","resolved","restored","revised",
  "saved","scaled","scheduled","shipped","spearheaded","streamlined","strengthened",
  "supervised","surpassed","tested","trained","transformed","translated","upgraded","won","wrote",
];

const WEAK_VERBS = [
  "helped","worked","responsible for","duties included","tasked with","in charge of",
  "assisted","participated in","handled","did","made","used",
];

const BUZZWORDS = [
  "synergy","synergies","think outside the box","go-getter","go getter","results-driven",
  "results driven","team player","hard worker","hardworking","self-starter","self starter",
  "detail-oriented","detail oriented","best of breed","wheelhouse","disruptive","evangelist",
  "guru","ninja","rockstar","superstar","world-class","world class","value add","value-add",
  "best practice","best practices","leverage","leverages","leveraged","paradigm",
  "paradigm shift","passionate","passion","dynamic","proactive","out-of-the-box",
  "outside the box","cross-functional","stakeholder","mission-critical","low-hanging fruit",
  "move the needle","boil the ocean",
];

const KEYWORD_BANK: string[] = [
  "javascript","typescript","python","java","c++","c#","go","golang","rust","ruby","php",
  "swift","kotlin","scala","sql","nosql","html","css","react","angular","vue","svelte",
  "next.js","node","node.js","express","django","flask","spring","fastapi","graphql","rest",
  "api","microservices","docker","kubernetes","aws","azure","gcp","terraform","ci/cd",
  "jenkins","git","linux","bash","redis","mongodb","postgresql","mysql","elasticsearch",
  "kafka","rabbitmq","machine learning","deep learning","tensorflow","pytorch","nlp",
  "computer vision","data science","data analysis","pandas","numpy","scikit-learn","tableau",
  "power bi","excel","agile","scrum","kanban","jira","tdd","unit testing","jest","cypress",
  "selenium","leadership","management","communication","collaboration","project management",
  "stakeholder management","cross-functional","strategy","roadmap","kpi","okr","roi",
  "analytics","reporting","forecasting","budgeting","negotiation","presentation","mentoring",
  "training","onboarding","process improvement","optimization","automation","saas","b2b","b2c",
  "growth","retention","engagement","conversion","acquisition","go-to-market","product launch",
  "user research","ux","ui","wireframing","prototyping",
];


// Helpers
function normalize(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/\u00a0/g, " ");
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = haystack.match(new RegExp(`\\b${escaped}\\b`, "gi"));
  return matches ? matches.length : 0;
}

function hasEmail(text: string): boolean {
  return /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/i.test(text);
}

function hasPhone(text: string): boolean {
  return /(\+?\d{1,2}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/.test(text);
}

function hasLinkedIn(text: string): boolean {
  return /linkedin\.com\/(in|pub|profile)/i.test(text) || /linkedin/i.test(text);
}

function hasGitHub(text: string): boolean {
  return /github\.com\//i.test(text) || /\bgithub\b/i.test(text);
}

function hasPortfolio(text: string): boolean {
  return /portfolio|personal\s+site|website|blog/i.test(text);
}

function hasLocation(text: string): boolean {
  const head = text.split("\n").slice(0, 8).join("\n");
  return /[A-Z][a-zA-Z]+\s*,\s*[A-Z]{2}/.test(head) || /\b(USA|United States|Canada|UK|India|Germany|Australia)\b/i.test(head);
}

function hasName(text: string): boolean {
  const firstLines = text.split("\n").slice(0, 6).filter((l) => l.trim().length > 0);
  for (const line of firstLines) {
    const trimmed = line.trim();
    const words = trimmed.split(/\s+/);
    if (words.length >= 2 && words.length <= 4) {
      if (words.every((w) => /^[A-Z][a-zA-Z'\-]+$/.test(w))) return true;
    }
  }
  return false;
}

function hasDateRange(text: string): boolean {
  return /(\b(19|20)\d{2}\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(19|20)\d{2}\b).*(\-|–|—|to).*(\b(19|20)\d{2}\b|present|current|now)/i.test(text);
}

function hasQuantification(text: string): number {
  const lines = text.split("\n");
  let count = 0;
  const quantRe = /(\$\s?\d|\b\d+(\.\d+)?\s?(%|percent|x|k|m|b|million|billion|thousand|users|customers|hours|days|weeks|months|years|projects|reports|people|team members|engineers)\b|\b\d+\s?(%|percent)\b)/i;
  for (const line of lines) if (quantRe.test(line)) count++;
  return count;
}

function hasUrl(text: string): boolean {
  return /https?:\/\/[^\s]+/i.test(text);
}

function hasSpecialChars(text: string): string[] {
  const found: string[] = [];
  const offenders: { char: string; name: string }[] = [
    { char: "✓", name: "checkmark (✓)" },{ char: "✔", name: "heavy checkmark (✔)" },
    { char: "✗", name: "ballot (✗)" },{ char: "→", name: "right arrow (→)" },
    { char: "•", name: "unicode bullet (•)" },{ char: "◆", name: "diamond (◆)" },
    { char: "★", name: "star (★)" },{ char: "☆", name: "outline star (☆)" },
    { char: "❯", name: "chevron (❯)" },{ char: "▶", name: "play arrow (▶)" },
    { char: "■", name: "square bullet (■)" },{ char: "○", name: "hollow circle (○)" },
    { char: "●", name: "filled circle (●)" },{ char: "™", name: "trademark (™)" },
    { char: "©", name: "copyright (©)" },{ char: "–", name: "en dash (–)" },
    { char: "—", name: "em dash (—)" },{ char: "\u2026", name: "ellipsis (…)" },
    { char: "\u201c", name: "curly open quote" },{ char: "\u201d", name: "curly close quote" },
    { char: "\u2018", name: "curly apostrophe" },{ char: "\u2019", name: "curly apostrophe" },
  ];
  for (const o of offenders) if (text.includes(o.char)) found.push(o.name);
  return found;
}

function looksLikeTabularData(text: string): boolean {
  const lines = text.split("\n");
  let tabularLines = 0;
  for (const line of lines) if (/\t/.test(line) || /\s{3,}\S/.test(line)) tabularLines++;
  return tabularLines >= 5;
}

function hasTooShortBullets(text: string): number {
  const lines = text.split("\n");
  let short = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[\-\*\u2022\u25CF\u25CB\u25AA]\s+/.test(trimmed) || /^[•●○■]\s+/.test(trimmed)) {
      const words = trimmed.split(/\s+/).length;
      if (words > 0 && words < 6) short++;
    }
  }
  return short;
}

function countBulletPoints(text: string): number {
  const lines = text.split("\n");
  let count = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[•●○■▪◦·\-\*]\s+/.test(trimmed)) count++;
  }
  return count;
}

function findSections(text: string): SectionInfo[] {
  const lines = text.split("\n");
  const found: SectionInfo[] = [];
  const seen = new Set<string>();

  const head = lines.slice(0, 8).join("\n");
  if (hasEmail(head) || hasPhone(head)) {
    found.push({ name: "Contact", present: true, startLine: 1, matchedHeading: "(detected at top of resume)" });
    seen.add("Contact");
  }

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;
    for (const section of SECTION_PATTERNS) {
      if (seen.has(section.name)) continue;
      if (section.patterns.some((p) => p.test(trimmed)) && trimmed.length <= 60) {
        found.push({ name: section.name, present: true, startLine: i + 1, matchedHeading: trimmed });
        seen.add(section.name);
        break;
      }
    }
  }

  for (const name of [...REQUIRED_SECTIONS, ...OPTIONAL_SECTIONS]) {
    if (!seen.has(name)) found.push({ name, present: false });
  }
  return found;
}

function extractTopKeywords(text: string): KeywordMatch[] {
  const lower = text.toLowerCase();
  const matches: KeywordMatch[] = [];
  for (const kw of KEYWORD_BANK) {
    const count = countOccurrences(lower, kw.toLowerCase());
    if (count > 0) matches.push({ keyword: kw, count });
  }
  matches.sort((a, b) => b.count - a.count);
  return matches.slice(0, 12);
}


// Category scorers


function scoreContact(text: string): { score: number; findings: Finding[] } {
  let score = 0;
  const findings: Finding[] = [];
  const head = text.split("\n").slice(0, 10).join("\n");

  if (hasName(text)) { score += 20; findings.push({ severity: "good", message: "Full name detected at the top of the resume." }); }
  else findings.push({ severity: "warning", message: "Could not detect a full name in the first lines. Place your name at the very top." });

  if (hasEmail(head)) { score += 20; findings.push({ severity: "good", message: "Email address present." }); }
  else findings.push({ severity: "critical", message: "No email address found. ATS systems need an email to route your application." });

  if (hasPhone(head)) { score += 20; findings.push({ severity: "good", message: "Phone number present." }); }
  else findings.push({ severity: "warning", message: "No phone number detected. Add one in the contact header." });

  if (hasLocation(head)) { score += 15; findings.push({ severity: "good", message: "Location (city, state) detected." }); }
  else findings.push({ severity: "info", message: "Add a city/state so recruiters can filter by location." });

  if (hasLinkedIn(head)) { score += 15; findings.push({ severity: "good", message: "LinkedIn profile link detected." }); }
  else findings.push({ severity: "info", message: "Add a LinkedIn URL to strengthen your professional presence." });

  if (hasGitHub(head) || hasPortfolio(head)) { score += 10; findings.push({ severity: "good", message: "Portfolio/GitHub link detected — great for technical roles." }); }
  else findings.push({ severity: "info", message: "For technical roles, a GitHub or portfolio link adds credibility." });

  return { score: clamp(score), findings };
}

function scoreSummary(text: string, sections: SectionInfo[]): { score: number; findings: Finding[] } {
  const findings: Finding[] = [];
  const summarySection = sections.find((s) => s.name === "Summary");
  if (!summarySection?.present) {
    return { score: 15, findings: [{ severity: "critical", message: "No professional summary or objective section detected." }] };
  }

  const lines = text.split("\n");
  const startIdx = (summarySection.startLine ?? 1) - 1;
  const contentLines: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) { if (contentLines.length > 0) break; continue; }
    const isHeading = SECTION_PATTERNS.some((sec) =>
      sec.name !== "Summary" && sec.patterns.some((p) => p.test(trimmed)) && trimmed.length <= 60);
    if (isHeading && contentLines.length > 0) break;
    contentLines.push(trimmed);
  }

  const wordCount = contentLines.join(" ").split(/\s+/).filter(Boolean).length;
  let score = 40;
  findings.push({ severity: "good", message: "Professional summary section detected." });

  if (wordCount >= 30 && wordCount <= 80) { score += 40; findings.push({ severity: "good", message: `Summary length is ideal (${wordCount} words).` }); }
  else if (wordCount > 0 && wordCount < 30) { score += 20; findings.push({ severity: "warning", message: `Summary is short (${wordCount} words). Aim for 3–4 sentences (~40–70 words).` }); }
  else if (wordCount > 80) { score += 25; findings.push({ severity: "warning", message: `Summary is long (${wordCount} words). Trim to 3–4 punchy sentences.` }); }
  else findings.push({ severity: "warning", message: "Summary heading exists but has no content beneath it." });

  const summaryText = contentLines.join(" ");
  if (/\b(i\s+(am|have|was|worked|built|designed|led|managed|developed|created))\b/i.test(summaryText)) {
    score -= 10;
    findings.push({ severity: "warning", message: "Avoid first-person pronouns (\"I\") in the resume summary." });
  }
  return { score: clamp(score), findings };
}

function scoreExperience(text: string, sections: SectionInfo[]): { score: number; findings: Finding[] } {
  const findings: Finding[] = [];
  const expSection = sections.find((s) => s.name === "Experience");
  if (!expSection?.present) {
    return { score: 10, findings: [{ severity: "critical", message: "No work experience section detected. This is the core of any resume." }] };
  }

  let score = 30;
  findings.push({ severity: "good", message: "Work experience section detected." });

  if (hasDateRange(text)) { score += 25; findings.push({ severity: "good", message: "Date ranges (start – end) detected for roles." }); }
  else findings.push({ severity: "warning", message: "No clear date ranges found. Include month/year for each role." });

  const bullets = countBulletPoints(text);
  if (bullets >= 5) { score += 25; findings.push({ severity: "good", message: `${bullets} bullet points detected — strong detail level.` }); }
  else if (bullets > 0) { score += 12; findings.push({ severity: "warning", message: `Only ${bullets} bullet points found. Aim for 3–5 bullets per role.` }); }
  else findings.push({ severity: "warning", message: "No bullet points detected. Use bullets to describe achievements, not paragraphs." });

  const quantified = hasQuantification(text);
  if (quantified >= 3) { score += 20; findings.push({ severity: "good", message: `${quantified} quantified achievements detected (numbers, %, $).` }); }
  else if (quantified > 0) { score += 8; findings.push({ severity: "warning", message: `Only ${quantified} quantified achievements. Add metrics to every bullet.` }); }
  else findings.push({ severity: "warning", message: "No quantified achievements found. Numbers (%, $, counts) make bullets 3× more impactful." });

  return { score: clamp(score), findings };
}

function scoreEducation(text: string, sections: SectionInfo[]): { score: number; findings: Finding[] } {
  const findings: Finding[] = [];
  const eduSection = sections.find((s) => s.name === "Education");
  if (!eduSection?.present) {
    return { score: 20, findings: [{ severity: "critical", message: "No education section detected. Even experienced professionals should list a degree." }] };
  }

  let score = 50;
  findings.push({ severity: "good", message: "Education section detected." });

  if (/\b(bachelor|b\.?s\.?|b\.?a\.?|b\.?tech|master|m\.?s\.?|m\.?a\.?|mba|ph\.?d|associate|diploma)\b/i.test(text)) { score += 30; findings.push({ severity: "good", message: "Degree type explicitly mentioned." }); }
  else findings.push({ severity: "warning", message: "Degree type not detected. Spell out the degree (e.g., \"B.S. in Computer Science\")." });

  if (/\b(19|20)\d{2}\b/.test(text)) { score += 20; findings.push({ severity: "good", message: "Graduation year present." }); }
  else findings.push({ severity: "info", message: "Add graduation year(s) for each degree." });

  return { score: clamp(score), findings };
}

function scoreSkills(text: string, sections: SectionInfo[], keywords: KeywordMatch[]): { score: number; findings: Finding[] } {
  const findings: Finding[] = [];
  const skillsSection = sections.find((s) => s.name === "Skills");
  if (!skillsSection?.present) {
    return { score: 25, findings: [{ severity: "critical", message: "No dedicated skills section found. ATS parsers look for a clear skills block." }] };
  }

  let score = 40;
  findings.push({ severity: "good", message: "Dedicated skills section detected." });

  if (keywords.length >= 8) { score += 40; findings.push({ severity: "good", message: `${keywords.length} recognized technical/industry keywords found.` }); }
  else if (keywords.length >= 4) { score += 25; findings.push({ severity: "warning", message: `${keywords.length} keywords found. Add more relevant skills to match job postings.` }); }
  else { score += 10; findings.push({ severity: "warning", message: "Very few recognized keywords. Add a broader skill set." }); }

  const lines = text.split("\n");
  const skillsLine = lines.find((l) => /^(technical\s+)?skills\s*[:\-]/i.test(l.trim()));
  if (skillsLine && /[,|•]/.test(skillsLine)) { score += 20; findings.push({ severity: "good", message: "Skills are cleanly delimited (commas/pipes) — easy for ATS to parse." }); }

  return { score: clamp(score), findings };
}

function scoreActionVerbs(text: string): { score: number; findings: Finding[] } {
  const findings: Finding[] = [];
  const lower = text.toLowerCase();
  let verbCount = 0;
  const matched: string[] = [];
  for (const verb of ACTION_VERBS) {
    const c = countOccurrences(lower, verb);
    if (c > 0) { verbCount += c; matched.push(verb); }
  }

  let score = 0;
  if (verbCount >= 8) { score = 90; findings.push({ severity: "good", message: `${verbCount} strong action verbs used (e.g., ${matched.slice(0, 4).join(", ")}).` }); }
  else if (verbCount >= 4) { score = 65; findings.push({ severity: "good", message: `${verbCount} action verbs found. Add more to strengthen impact.` }); }
  else if (verbCount > 0) { score = 40; findings.push({ severity: "warning", message: `Only ${verbCount} action verbs detected. Start each bullet with a strong verb.` }); }
  else { score = 15; findings.push({ severity: "warning", message: "No recognized action verbs found. Start bullets with verbs like \"Led\", \"Built\", \"Optimized\"." }); }

  let weakCount = 0;
  for (const phrase of WEAK_VERBS) weakCount += countOccurrences(lower, phrase);
  if (weakCount > 0) {
    score -= Math.min(25, weakCount * 5);
    findings.push({ severity: "warning", message: `${weakCount} weak phrases found (e.g., "responsible for", "helped"). Replace with action verbs.` });
  }
  return { score: clamp(score), findings };
}

function scoreAtsFormatting(text: string): { score: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let score = 60;

  const specialChars = hasSpecialChars(text);
  if (specialChars.length === 0) { score += 15; findings.push({ severity: "good", message: "No problematic special characters detected." }); }
  else { score -= Math.min(30, specialChars.length * 6); findings.push({ severity: "warning", message: `${specialChars.length} special characters may break ATS parsing: ${specialChars.slice(0, 4).join(", ")}${specialChars.length > 4 ? "…" : ""}.` }); }

  if (looksLikeTabularData(text)) { score -= 20; findings.push({ severity: "warning", message: "Resume appears to use columns/tables. Most ATS cannot parse multi-column layouts — switch to a single-column format." }); }
  else { score += 10; findings.push({ severity: "good", message: "No multi-column / tabular structure detected." }); }

  const shortBullets = hasTooShortBullets(text);
  if (shortBullets > 0) { score -= Math.min(15, shortBullets * 3); findings.push({ severity: "info", message: `${shortBullets} bullets are very short (<6 words). Expand them with context and impact.` }); }

  if (hasUrl(text)) findings.push({ severity: "info", message: "URLs detected — make sure they are plain text (not hyperlinked images)." });
  if (/page\s+\d+\s+of\s+\d+/i.test(text)) { score -= 5; findings.push({ severity: "info", message: "\"Page X of Y\" markers found — ATS may misinterpret them. Keep them in the footer only." }); }

  return { score: clamp(score), findings };
}

function scoreKeywordOptimization(text: string, keywords: KeywordMatch[]): { score: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let score = 0;

  if (keywords.length === 0) {
    return { score: 10, findings: [{ severity: "warning", message: "No recognized industry keywords found. Tailor your resume to the job description." }] };
  }

  if (keywords.length >= 12) { score = 95; findings.push({ severity: "good", message: "Excellent keyword coverage — resume is well-tailored." }); }
  else if (keywords.length >= 8) { score = 80; findings.push({ severity: "good", message: "Good keyword coverage. Add a few more role-specific terms." }); }
  else if (keywords.length >= 5) { score = 60; findings.push({ severity: "warning", message: "Moderate keyword coverage. Mirror more terms from the job description." }); }
  else { score = 35; findings.push({ severity: "warning", message: "Low keyword coverage. Resumes that don't match JD keywords get filtered out." }); }

  const lower = text.toLowerCase();
  let buzzCount = 0;
  const matchedBuzz: string[] = [];
  for (const bw of BUZZWORDS) {
    const c = countOccurrences(lower, bw);
    if (c > 0) { buzzCount += c; matchedBuzz.push(bw); }
  }
  if (buzzCount > 0) {
    score -= Math.min(25, buzzCount * 5);
    findings.push({ severity: "warning", message: `${buzzCount} cliché buzzwords found (${matchedBuzz.slice(0, 3).join(", ")}). Replace with concrete achievements.` });
  } else {
    findings.push({ severity: "good", message: "No cliché buzzwords detected." });
  }
  return { score: clamp(score), findings };
}

function gradeFor(score: number): { grade: string; color: string } {
  if (score >= 90) return { grade: "A", color: "emerald" };
  if (score >= 80) return { grade: "B", color: "emerald" };
  if (score >= 70) return { grade: "C", color: "amber" };
  if (score >= 60) return { grade: "D", color: "amber" };
  if (score >= 50) return { grade: "E", color: "orange" };
  return { grade: "F", color: "rose" };
}


// Main analyzer

const CATEGORY_WEIGHTS: { id: string; label: string; description: string; weight: number }[] = [
  { id: "contact", label: "Contact Info", description: "Name, email, phone, location, and links", weight: 0.1 },
  { id: "summary", label: "Professional Summary", description: "Concise intro highlighting your value", weight: 0.1 },
  { id: "experience", label: "Work Experience", description: "Roles with dates, bullets, and metrics", weight: 0.22 },
  { id: "education", label: "Education", description: "Degrees, institutions, and dates", weight: 0.1 },
  { id: "skills", label: "Skills Section", description: "Dedicated, well-delimited skills block", weight: 0.13 },
  { id: "actionVerbs", label: "Action Verbs & Impact", description: "Strong verbs and quantified achievements", weight: 0.12 },
  { id: "atsFormatting", label: "ATS Formatting", description: "Clean, parseable layout without tables/symbols", weight: 0.13 },
  { id: "keywords", label: "Keyword Optimization", description: "Industry keywords matching the job description", weight: 0.1 },
];

export function analyzeResume(rawText: string): AnalysisResult {
  const text = normalize(rawText);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const sections = findSections(text);
  const keywords = extractTopKeywords(text);

  const contact = scoreContact(text);
  const summary = scoreSummary(text, sections);
  const experience = scoreExperience(text, sections);
  const education = scoreEducation(text, sections);
  const skills = scoreSkills(text, sections, keywords);
  const actionVerbs = scoreActionVerbs(text);
  const atsFormatting = scoreAtsFormatting(text);
  const keywordsScore = scoreKeywordOptimization(text, keywords);

  const scores: Record<string, { score: number; findings: Finding[] }> = {
    contact, summary, experience, education, skills, actionVerbs, atsFormatting, keywords: keywordsScore,
  };

  const categories: CategoryScore[] = CATEGORY_WEIGHTS.map((c) => {
    const s = scores[c.id];
    const contribution = (s.score / 100) * c.weight * 100;
    return {
      id: c.id, label: c.label, description: c.description,
      score: Math.round(s.score), weight: c.weight,
      contribution: Math.round(contribution * 10) / 10, findings: s.findings,
    };
  });

  const overallScore = Math.round(categories.reduce((sum, c) => sum + c.contribution, 0));
  const { grade, color } = gradeFor(overallScore);
  const missingSections = sections.filter((s) => !s.present && REQUIRED_SECTIONS.includes(s.name));

  const atsChecks: AtsCheck[] = [
    { id: "standard-headings", label: "Standard section headings", passed: sections.filter((s) => s.present && REQUIRED_SECTIONS.includes(s.name)).length >= 4, detail: "ATS parsers recognize headings like Experience, Education, Skills. Avoid creative names." },
    { id: "no-tables", label: "Single-column layout (no tables)", passed: !looksLikeTabularData(text), detail: "Tables and multi-column layouts break ATS text extraction." },
    { id: "no-special-chars", label: "No problematic special characters", passed: hasSpecialChars(text).length === 0, detail: "Symbols like ✓, ★, → can corrupt parsed text." },
    { id: "contact-parseable", label: "Contact info is parseable", passed: hasEmail(text) && hasPhone(text), detail: "Email and phone must be plain text, not embedded in images." },
    { id: "date-ranges", label: "Clear date ranges", passed: hasDateRange(text), detail: "Use standard formats like \"Jan 2021 – Present\" or \"2021 – 2023\"." },
    { id: "standard-bullets", label: "Standard bullet characters", passed: countBulletPoints(text) > 0, detail: "Use simple bullets (• or -) instead of custom icons." },
    { id: "keyword-density", label: "Sufficient keyword density", passed: keywords.length >= 6, detail: "Mirror keywords from the job description to pass keyword filters." },
    { id: "reasonable-length", label: "Reasonable resume length", passed: wordCount >= 200 && wordCount <= 1200, detail: "1–2 pages (roughly 300–1000 words) is the ATS sweet spot." },
  ];

  const suggestions: Suggestion[] = [];

  for (const s of missingSections) {
    suggestions.push({
      id: `missing-${s.name.toLowerCase()}`,
      severity: "critical",
      title: `Add a ${s.name} section`,
      detail: `A ${s.name} section is expected on every professional resume. ATS parsers look for it explicitly.`,
      action: s.name === "Summary" ? "Write 3–4 sentences highlighting your years of experience, top skills, and one quantified achievement."
        : s.name === "Experience" ? "List roles in reverse-chronological order with company, title, dates, and 3–5 achievement bullets each."
        : s.name === "Education" ? "Add your most recent degree, institution, and graduation year."
        : s.name === "Skills" ? "Create a bulleted or comma-separated list of 8–15 relevant technical and soft skills."
        : `Add a clearly labeled "${s.name}" heading near the top of the resume.`,
    });
  }

  for (const name of OPTIONAL_SECTIONS) {
    const sec = sections.find((s) => s.name === name);
    if (sec && !sec.present && name === "Projects") {
      suggestions.push({ id: `add-${name.toLowerCase()}`, severity: "info", title: "Consider adding a Projects section", detail: "For technical roles, personal or academic projects demonstrate applied skills.", action: "Add 2–3 projects with a one-line description, tech stack, and a link if available." });
    }
  }

  const quantified = hasQuantification(text);
  if (quantified < 3) {
    suggestions.push({ id: "quantify", severity: "warning", title: "Quantify your achievements", detail: `Only ${quantified} of your bullets contain numbers. Recruiters scan for metrics like %, $, and counts.`, action: "Rewrite each experience bullet to include at least one number — e.g., \"Reduced API latency by 40%\"." });
  }

  const lower = text.toLowerCase();
  let weakCount = 0;
  for (const phrase of WEAK_VERBS) weakCount += countOccurrences(lower, phrase);
  if (weakCount > 0) {
    suggestions.push({ id: "replace-weak-verbs", severity: "warning", title: "Replace weak phrases with action verbs", detail: `Found ${weakCount} instances of weak phrasing like "responsible for" or "helped with".`, action: "Start each bullet with a strong verb — Led, Built, Shipped, Optimized, Designed — followed by the outcome." });
  }

  let buzzCount = 0;
  const matchedBuzz: string[] = [];
  for (const bw of BUZZWORDS) {
    const c = countOccurrences(lower, bw);
    if (c > 0) { buzzCount += c; matchedBuzz.push(bw); }
  }
  if (buzzCount > 0) {
    suggestions.push({ id: "remove-buzzwords", severity: "warning", title: "Remove cliché buzzwords", detail: `Words like "${matchedBuzz.slice(0, 3).join("\", \"")}" add no information and signal low substance.`, action: "Replace each buzzword with a specific, verifiable achievement." });
  }

  const specialChars = hasSpecialChars(text);
  if (specialChars.length > 0) {
    suggestions.push({ id: "remove-special-chars", severity: "warning", title: "Remove special characters that break ATS parsing", detail: `Detected: ${specialChars.slice(0, 5).join(", ")}.`, action: "Replace with plain-text equivalents: bullets → \"-\" or \"•\", arrows → \"to\", dashes → \"-\"." });
  }

  if (looksLikeTabularData(text)) {
    suggestions.push({ id: "single-column", severity: "critical", title: "Convert to a single-column layout", detail: "Multi-column or tabular layouts are not parsed correctly by most ATS systems.", action: "Use a single-column template. Put dates on the same line as the role, not in a separate column." });
  }

  if (keywords.length < 8) {
    suggestions.push({ id: "tailor-keywords", severity: "warning", title: "Tailor keywords to the job description", detail: `Only ${keywords.length} industry keywords detected. ATS filters rank by keyword match.`, action: "Paste the job description, extract the top 10–15 required skills, and weave them naturally into your Skills and Experience sections." });
  }

  const summarySection = sections.find((s) => s.name === "Summary");
  if (summarySection?.present) {
    const lines = text.split("\n");
    const startIdx = (summarySection.startLine ?? 1) - 1;
    const contentLines: string[] = [];
    for (let i = startIdx + 1; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (!trimmed) { if (contentLines.length > 0) break; continue; }
      const isHeading = SECTION_PATTERNS.some((sec) => sec.name !== "Summary" && sec.patterns.some((p) => p.test(trimmed)) && trimmed.length <= 60);
      if (isHeading && contentLines.length > 0) break;
      contentLines.push(trimmed);
    }
    const summaryText = contentLines.join(" ");
    if (/\b(i\s+(am|have|was|worked|built|designed|led|managed|developed|created))\b/i.test(summaryText)) {
      suggestions.push({ id: "remove-first-person", severity: "info", title: "Remove first-person pronouns", detail: "Resumes should be written in implied first person — drop \"I\", \"my\", \"me\".", action: "Rewrite \"I built a dashboard\" as \"Built a dashboard that…\"" });
    }
  }

  if (wordCount < 200) {
    suggestions.push({ id: "too-short", severity: "warning", title: "Resume is too short", detail: `Only ${wordCount} words detected. A resume below 200 words looks thin to ATS and recruiters.`, action: "Expand experience bullets, add a Projects section, or include certifications and relevant coursework." });
  } else if (wordCount > 1200) {
    suggestions.push({ id: "too-long", severity: "info", title: "Resume may be too long", detail: `${wordCount} words detected. Resumes over 2 pages risk being truncated by ATS.`, action: "Trim older roles, cut redundant bullets, and keep only the last 10 years of experience." });
  }

  const severityOrder: Record<Severity, number> = { critical: 0, warning: 1, info: 2, good: 3 };
  suggestions.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  let actionVerbCount = 0;
  for (const verb of ACTION_VERBS) actionVerbCount += countOccurrences(lower, verb);
  let buzzwordCount = 0;
  for (const bw of BUZZWORDS) buzzwordCount += countOccurrences(lower, bw);
  let passiveCount = 0;
  for (const phrase of WEAK_VERBS) passiveCount += countOccurrences(lower, phrase);

  return {
    overallScore, grade, gradeColor: color, wordCount, categories, sections, missingSections,
    suggestions, atsChecks, topKeywords: keywords,
    stats: {
      bulletPoints: countBulletPoints(text),
      actionVerbs: actionVerbCount,
      quantifiedAchievements: hasQuantification(text),
      passivePhrases: passiveCount,
      buzzwords: buzzwordCount,
    },
  };
}


// Sample resume (deliberately imperfect, for demos)

export const SAMPLE_RESUME = `Jane Doe
San Francisco, CA | jane.doe@email.com | (415) 555-1234 | linkedin.com/in/janedoe

Summary
I am a passionate software engineer with 5 years of experience building web applications. I am a results-driven team player who thinks outside the box and is responsible for delivering high-quality software.

Experience
Software Engineer — Acme Corp
2020 - Present
- Helped with the migration of the legacy monolith to microservices
- Worked on the frontend using React and TypeScript
- Responsible for code reviews and mentoring junior developers
- Built a real-time analytics dashboard used by 200+ users

Junior Developer — StartUp Inc
2018 - 2020
- Assisted in building the customer onboarding flow
- Did bug fixes and small feature work
- Participated in daily standups

Education
B.S. in Computer Science
University of California, Berkeley
2018

Skills
JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker, Git
`;

/**
 * Serializes a PrepVerse ResumeData object into plain text
 * so the analyzer can score the resume being built in the form.
 */
export function serializeResumeData(resume: {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  education: { institution: string; degree: string; period: string; grade: string }[];
  experience: { company: string; role: string; period: string; description: string }[];
  projects: { name: string; tech: string; description: string; link: string }[];
  skills: string[];
}): string {
  const lines: string[] = [];
  lines.push(resume.fullName || "");
  const contactParts = [
    resume.email,
    resume.phone,
    resume.website,
    resume.github,
    resume.linkedin,
  ].filter(Boolean);
  lines.push(contactParts.join(" | "));
  lines.push("");

  if (resume.experience.length > 0) {
    lines.push("Experience");
    for (const exp of resume.experience) {
      lines.push(`${exp.role} — ${exp.company}`);
      lines.push(exp.period);
      lines.push(`- ${exp.description}`);
      lines.push("");
    }
  }

  if (resume.education.length > 0) {
    lines.push("Education");
    for (const edu of resume.education) {
      lines.push(edu.degree);
      lines.push(edu.institution);
      lines.push(edu.period);
      if (edu.grade) lines.push(edu.grade);
      lines.push("");
    }
  }

  if (resume.projects.length > 0) {
    lines.push("Projects");
    for (const proj of resume.projects) {
      lines.push(proj.name);
      if (proj.tech) lines.push(`Tech: ${proj.tech}`);
      lines.push(`- ${proj.description}`);
      if (proj.link) lines.push(proj.link);
      lines.push("");
    }
  }

  if (resume.skills.length > 0) {
    lines.push("Skills");
    lines.push(resume.skills.join(", "));
  }

  return lines.join("\n");
}
