/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ResumeStudio — resume builder + ATS score analyzer.
 *
 * CHANGES:
 *  - Preserved the existing resume-builder form, AI bullet optimizer, templates, print.
 *  - Added a top-level tab toggle: "Resume Builder" | "ATS Analyzer".
 *  - The ATS Analyzer tab runs the deep 8-category analyzer from utils/atsAnalyzer.
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  FileText, Sparkles, Printer, Plus, Trash2, CheckCircle, AlertCircle,
  TrendingUp, Award, ChevronDown, RefreshCw, Mail, Phone, Globe, Github,
  Linkedin, Search, Loader2, Upload, XCircle, AlertTriangle, Info, Lightbulb,
  ListChecks, ShieldCheck, Zap, Gauge, ChevronRight,
} from "lucide-react";
import { ResumeData } from "../types";
import { ResumeStudioSkeleton } from "./SkeletonLoaders";
import {
  analyzeResume,
  serializeResumeData,
  SAMPLE_RESUME,
  type AnalysisResult,
  type CategoryScore,
  type Finding,
  type Severity,
  type Suggestion,
  type SectionInfo,
} from "../utils/atsAnalyzer";

// ---------------------------------------------------------------------------
// Small UI helpers (plain Tailwind — no shadcn/ui)
// ---------------------------------------------------------------------------

const severityStyles: Record<
  Severity,
  { icon: typeof AlertCircle; color: string; bg: string; ring: string; label: string }
> = {
  critical: { icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10", ring: "ring-rose-500/30", label: "Critical" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/30", label: "Warning" },
  info: { icon: Info, color: "text-sky-400", bg: "bg-sky-500/10", ring: "ring-sky-500/30", label: "Info" },
  good: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/30", label: "Good" },
};

function gradeColor(score: number) {
  if (score >= 80) return { text: "text-emerald-400", stroke: "#10b981", label: "Excellent" };
  if (score >= 65) return { text: "text-lime-400", stroke: "#a3e635", label: "Good" };
  if (score >= 50) return { text: "text-amber-400", stroke: "#f59e0b", label: "Needs work" };
  return { text: "text-rose-400", stroke: "#f43f5e", label: "High risk" };
}

function ScoreGauge({ score }: { score: number }) {
  const radius = 90;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = gradeColor(score);
  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90"
        style={{ "--pv-gauge-circumference": `${circumference}`, "--pv-gauge-offset": `${offset}` } as React.CSSProperties}>
        <circle cx="110" cy="110" r={radius} stroke="rgba(148,163,184,0.12)" strokeWidth={stroke} fill="none" />
        <circle cx="110" cy="110" r={radius} stroke={color.stroke} strokeWidth={stroke} strokeLinecap="round" fill="none"
          strokeDasharray={circumference} className="pv-gauge-arc" style={{ strokeDashoffset: offset }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold tabular-nums ${color.text}`}>{score}</span>
        <span className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">out of 100</span>
        <span className={`mt-2 rounded-full bg-slate-800/60 px-2 py-0.5 text-[11px] font-medium ${color.text}`}>
          {color.label}
        </span>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: CategoryScore }) {
  const color = category.score >= 80 ? "text-emerald-400" : category.score >= 60 ? "text-amber-400" : "text-rose-400";
  const barColor = category.score >= 80 ? "bg-emerald-500" : category.score >= 60 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 transition-colors hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-100">{category.label}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{category.description}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className={`text-xl font-bold tabular-nums ${color}`}>{category.score}</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-600">×{Math.round(category.weight * 100)}%</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${category.score}%` }} />
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        Contributes <span className="font-medium text-slate-400">{category.contribution.toFixed(1)}</span> pts to overall
      </p>
    </div>
  );
}

function FindingsList({ findings }: { findings: Finding[] }) {
  if (findings.length === 0) return <p className="py-6 text-center text-sm text-slate-500">No findings for this category.</p>;
  return (
    <ul className="space-y-2">
      {findings.map((f, i) => {
        const s = severityStyles[f.severity];
        const Icon = s.icon;
        return (
          <li key={i} className={`flex items-start gap-2.5 rounded-lg px-3 py-2 ring-1 ${s.bg} ${s.ring}`}>
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${s.color}`} />
            <span className="text-xs leading-relaxed text-slate-300">{f.message}</span>
          </li>
        );
      })}
    </ul>
  );
}

function MissingSections({ sections }: { sections: SectionInfo[] }) {
  const missing = sections.filter((s) => !s.present);
  if (missing.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 ring-1 ring-emerald-500/30">
        <CheckCircle className="h-4 w-4 text-emerald-400" />
        <span className="text-sm text-emerald-300">All key sections detected. Great structure!</span>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {missing.map((s) => (
        <span key={s.name} className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-xs text-rose-300">
          <XCircle className="h-3 w-3" />{s.name}
        </span>
      ))}
    </div>
  );
}

function SectionChecklist({ sections }: { sections: SectionInfo[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {sections.map((s) => (
        <div key={s.name} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
          s.present ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-200" : "border-slate-800 bg-slate-900/40 text-slate-500"}`}>
          {s.present ? <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" /> : <XCircle className="h-3.5 w-3.5 shrink-0 text-slate-600" />}
          <span className="truncate">{s.name}</span>
        </div>
      ))}
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const s = severityStyles[suggestion.severity];
  const Icon = s.icon;
  return (
    <div className={`rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 ring-1 ring-inset ${s.ring}`}>
      <div className="flex items-start gap-3">
        <div className={`rounded-lg p-2 ${s.bg}`}><Icon className={`h-4 w-4 ${s.color}`} /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-100">{suggestion.title}</h4>
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${s.bg} ${s.color}`}>{s.label}</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">{suggestion.detail}</p>
          <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-slate-950/60 px-2.5 py-2">
            <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
            <p className="text-xs leading-relaxed text-slate-300">{suggestion.action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, label, value, hint, tone }: {
  icon: typeof Zap; label: string; value: number | string; hint?: string;
  tone: "emerald" | "amber" | "rose" | "sky";
}) {
  const tones: Record<string, string> = {
    emerald: "text-emerald-400 bg-emerald-500/10",
    amber: "text-amber-400 bg-amber-500/10",
    rose: "text-rose-400 bg-rose-500/10",
    sky: "text-sky-400 bg-sky-500/10",
  };
  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
      <div className="flex items-center gap-2">
        <div className={`rounded-md p-1.5 ${tones[tone]}`}><Icon className="h-3.5 w-3.5" /></div>
        <span className="text-[11px] uppercase tracking-wider text-slate-500">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums text-slate-100">{value}</p>
      {hint && <p className="mt-0.5 text-[10px] text-slate-600">{hint}</p>}
    </div>
  );
}

function FindingsPanel({ result }: { result: AnalysisResult }) {
  const [selected, setSelected] = useState<string>(result.categories[0]?.id ?? "contact");
  const category = result.categories.find((c) => c.id === selected) ?? result.categories[0];
  return (
    <div className="space-y-3">
      <h3 className="text-xs uppercase tracking-wider text-slate-500">Detailed findings</h3>
      <div className="pv-scroll flex gap-1.5 overflow-x-auto pb-1">
        {result.categories.map((c) => (
          <button key={c.id} onClick={() => setSelected(c.id)}
            className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              c.id === selected ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"}`}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
        {category && (
          <div className="pv-fade-up space-y-3" key={category.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-100">{category.label}</p>
                <p className="text-xs text-slate-500">{category.description}</p>
              </div>
              <p className={`text-2xl font-bold tabular-nums ${category.score >= 80 ? "text-emerald-400" : category.score >= 60 ? "text-amber-400" : "text-rose-400"}`}>
                {category.score}<span className="text-xs text-slate-500">/100</span>
              </p>
            </div>
            <FindingsList findings={category.findings} />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ATS Analyzer tab (new)
// ---------------------------------------------------------------------------

function AtsAnalyzerTab({ resume, onLoadSampleData }: { resume: ResumeData; onLoadSampleData: () => string }) {
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeView, setActiveView] = useState<"categories" | "suggestions" | "keywords">("categories");
  const resultsRef = useRef<HTMLDivElement>(null);

  const wordCount = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);

  function handleAnalyze() {
    if (wordCount < 20) return;
    setAnalyzing(true);
    setTimeout(() => {
      const r = analyzeResume(text);
      setResult(r);
      setAnalyzing(false);
      requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }, 550);
  }

  function handleUseMyResume() {
    const serialized = onLoadSampleData() || serializeResumeData(resume);
    setText(serialized);
    setResult(null);
  }

  function handleLoadSample() {
    setText(SAMPLE_RESUME);
    setResult(null);
  }

  const passedAtsChecks = result ? result.atsChecks.filter((c) => c.passed).length : 0;

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold text-white">
              <FileText className="h-4 w-4 text-emerald-400" />Resume Input
            </h3>
            <p className="mt-1 text-xs text-slate-500">Paste plain text from your resume, or auto-fill from the builder.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleUseMyResume}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20">
              <Sparkles className="h-3.5 w-3.5" />Use my resume
            </button>
            <button onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:bg-slate-800">
              <Sparkles className="h-3.5 w-3.5" />Load sample
            </button>
            {text && (
              <button onClick={() => { setText(""); setResult(null); }}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
                <RefreshCw className="h-3.5 w-3.5" />Clear
              </button>
            )}
          </div>
        </div>
        <div className="relative">
          <textarea value={text} onChange={(e) => setText(e.target.value)}
            placeholder={"Paste your resume text here…\n\nTip: copy the text directly from your resume document (Word/PDF/Google Docs → Select All → Copy) and paste it here. The analyzer works on plain text, so formatting like bold/italics won't be preserved — that's intentional, because that's what ATS parsers see."}
            className="pv-scroll min-h-[220px] w-full resize-y rounded-xl border border-slate-800 bg-slate-950/60 p-4 font-mono text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-slate-900/80 px-2 py-1 text-[10px] text-slate-500 backdrop-blur-sm">
            {wordCount} words
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">Analysis runs entirely in your browser — no data is uploaded.</p>
          <button onClick={handleAnalyze} disabled={analyzing || wordCount < 20}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50">
            {analyzing ? <><Loader2 className="h-4 w-4 animate-spin" />Analyzing…</> : <><Search className="h-4 w-4" />Analyze resume</>}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultsRef} className="space-y-6">
          {/* Score + stats */}
          <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <div className="flex flex-col items-center rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
              <div className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-widest text-slate-500">
                <Gauge className="h-3.5 w-3.5" />Overall ATS Score
              </div>
              <ScoreGauge score={result.overallScore} />
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">
                  Grade {result.grade}
                </span>
                <span className="text-xs text-slate-500">{result.wordCount} words analyzed</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatTile icon={ListChecks} label="Bullets" value={result.stats.bulletPoints} hint="Action-oriented bullets" tone="sky" />
              <StatTile icon={Zap} label="Action verbs" value={result.stats.actionVerbs} hint="Strong verb usage" tone="emerald" />
              <StatTile icon={Award} label="Quantified" value={result.stats.quantifiedAchievements} hint="Bullets with numbers" tone="emerald" />
              <StatTile icon={AlertTriangle} label="Weak phrases" value={result.stats.passivePhrases} hint='"responsible for" etc.' tone="amber" />
              <StatTile icon={AlertCircle} label="Buzzwords" value={result.stats.buzzwords} hint="Cliché terms to cut" tone="rose" />
              <StatTile icon={ShieldCheck} label="ATS checks" value={`${passedAtsChecks}/${result.atsChecks.length}`} hint="Passed checks" tone={passedAtsChecks >= 6 ? "emerald" : passedAtsChecks >= 4 ? "amber" : "rose"} />
            </div>
          </div>

          {/* Missing sections + ATS compatibility */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10"><AlertCircle className="h-4 w-4 text-rose-400" /></span>
                Missing Sections
              </h3>
              <p className="mb-3 text-xs text-slate-500">Required sections recruiters and ATS parsers expect to find.</p>
              <MissingSections sections={result.sections} />
              <div className="my-4 h-px bg-slate-800" />
              <p className="mb-2 text-[11px] uppercase tracking-wider text-slate-500">Section checklist</p>
              <SectionChecklist sections={result.sections} />
            </div>
            <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10"><ShieldCheck className="h-4 w-4 text-emerald-400" /></span>
                ATS Compatibility
              </h3>
              <p className="mb-3 text-xs text-slate-500">Formatting checks that determine whether an ATS can parse your resume.</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {result.atsChecks.map((c) => (
                  <div key={c.id} title={c.detail}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors ${
                      c.passed ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10" : "border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10"}`}>
                    {c.passed ? <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" /> : <XCircle className="h-4 w-4 shrink-0 text-rose-400" />}
                    <span className={`text-xs font-medium ${c.passed ? "text-emerald-200" : "text-rose-200"}`}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed view switcher */}
          <div className="space-y-4">
            <div className="pv-scroll flex gap-1.5 overflow-x-auto">
              {([
                { id: "categories", label: `Categories`, icon: ListChecks },
                { id: "suggestions", label: `Suggestions (${result.suggestions.length})`, icon: Lightbulb },
                { id: "keywords", label: `Keywords (${result.topKeywords.length})`, icon: Search },
              ] as const).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeView === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveView(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive ? "bg-slate-800 text-emerald-300" : "bg-slate-900/60 text-slate-400 hover:text-slate-200"}`}>
                    <Icon className="h-3.5 w-3.5" />{tab.label}
                  </button>
                );
              })}
            </div>

            {activeView === "categories" && (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="min-w-0 space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500">Scoring breakdown</h3>
                  {result.categories.map((c) => <CategoryCard key={c.id} category={c} />)}
                  <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Sum of weighted contributions</span>
                      <span className="font-mono text-sm font-bold text-emerald-300">= {result.overallScore}</span>
                    </div>
                  </div>
                </div>
                <div className="min-w-0"><FindingsPanel key={result.overallScore + result.wordCount} result={result} /></div>
              </div>
            )}

            {activeView === "suggestions" && (
              <>
                {result.suggestions.length === 0 ? (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-sm text-emerald-200">
                    No critical suggestions — your resume is in great shape!
                  </div>
                ) : (
                  <div className="grid gap-3 lg:grid-cols-2">
                    {result.suggestions.map((s) => <SuggestionCard key={s.id} suggestion={s} />)}
                  </div>
                )}
              </>
            )}

            {activeView === "keywords" && (
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                <h3 className="text-sm font-semibold text-white">Detected industry keywords</h3>
                <p className="mb-4 mt-1 text-xs text-slate-500">
                  These are the technical and business terms an ATS would extract from your resume. Compare them to the job description — gaps mean you may be filtered out.
                </p>
                {result.topKeywords.length === 0 ? (
                  <p className="py-6 text-center text-sm text-slate-500">No recognized industry keywords found. Tailor your resume to the job description.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {result.topKeywords.map((k) => (
                      <span key={k.keyword} className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-200">
                        {k.keyword}
                        <span className="rounded bg-emerald-500/20 px-1.5 text-[10px] font-semibold text-emerald-300">{k.count}×</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <ChevronRight className="h-4 w-4 text-emerald-400" />Tweak your resume and re-analyze to see your score improve.
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:bg-slate-800 hover:text-white">
              Back to editor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component (preserves existing builder + adds tab toggle)
// ---------------------------------------------------------------------------

export default function ResumeStudio() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"builder" | "analyzer">("builder");
  const [resume, setResume] = useState<ResumeData>({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 019-2834",
    website: "https://janedoe.dev",
    github: "https://github.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
    education: [
      { institution: "State University", degree: "B.S. in Computer Science", period: "2023 - 2027", grade: "GPA: 3.9/4.0" },
    ],
    experience: [
      { company: "Acme Software", role: "Software Engineering Intern", period: "Summer 2025", description: "Worked on front-end features in React and TypeScript. Improved load performance of internal portals." },
    ],
    projects: [
      { name: "PrepVerse Placement Portal", tech: "React, Express, Google Gemini", description: "Collaborative preparation app with automated simulated grading and structured sheets.", link: "https://github.com/janedoe/prepverse" },
    ],
    skills: ["React", "TypeScript", "Node.js", "Express", "Python", "SQL", "Algorithms", "System Design"],
  });

  const [activeTemplate, setActiveTemplate] = useState("minimal");
  const [bulletToOptimize, setBulletToOptimize] = useState("Helped optimize load times for the company dashboard.");
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [score, setScore] = useState(0);
  const [checklist, setChecklist] = useState<{ label: string; passed: boolean }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Existing live ATS compliance score (kept for the builder tab)
    const checks = [
      { label: "Has GitHub profile linked", passed: !!resume.github },
      { label: "Has LinkedIn profile linked", passed: !!resume.linkedin },
      { label: "Has Phone and Email listed", passed: !!resume.phone && !!resume.email },
      { label: "At least 5 core technical skills", passed: resume.skills.length >= 5 },
      { label: "At least 1 detailed project", passed: resume.projects.length >= 1 },
      { label: "Professional work experience listed", passed: resume.experience.length >= 1 },
      { label: "Education details listed", passed: resume.education.length >= 1 },
    ];
    const passedCount = checks.filter((c) => c.passed).length;
    setScore(Math.round((passedCount / checks.length) * 100));
    setChecklist(checks);
  }, [resume]);

  if (loading) return <ResumeStudioSkeleton />;

  // Form management helpers (preserved from original)
  const handleAddEducation = () => setResume((prev) => ({ ...prev, education: [...prev.education, { institution: "", degree: "", period: "", grade: "" }] }));
  const handleRemoveEducation = (idx: number) => setResume((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));
  const handleAddExperience = () => setResume((prev) => ({ ...prev, experience: [...prev.experience, { company: "", role: "", period: "", description: "" }] }));
  const handleRemoveExperience = (idx: number) => setResume((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== idx) }));
  const handleAddProject = () => setResume((prev) => ({ ...prev, projects: [...prev.projects, { name: "", tech: "", description: "", link: "" }] }));
  const handleRemoveProject = (idx: number) => setResume((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== idx) }));

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!resume.skills.includes(newSkill.trim())) {
      setResume((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skill: string) => setResume((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));

  // AI Bullet optimization call to Gemini server (preserved)
  const handleOptimizeBullet = async () => {
    if (!bulletToOptimize.trim()) return;
    setIsAiLoading(true);
    setAiError("");
    setAiSuggestions("");
    try {
      const response = await fetch("/api/gemini/resume-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bullet: bulletToOptimize }),
      });
      if (!response.ok) throw new Error("Failed to optimize bullet");
      const data = await response.json();
      setAiSuggestions(data.suggestion || "No suggestion returned.");
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Failed to optimize bullet point.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + tab toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <FileText className="h-6 w-6 text-emerald-400" />Resume Studio
          </h2>
          <p className="mt-1 text-sm text-slate-400">Build your resume and score it against ATS systems.</p>
        </div>
        <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900/60 p-1">
          <button onClick={() => setActiveTab("builder")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "builder" ? "bg-slate-800 text-emerald-300" : "text-slate-400 hover:text-slate-200"}`}>
            <FileText className="h-4 w-4" />Builder
          </button>
          <button onClick={() => setActiveTab("analyzer")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "analyzer" ? "bg-slate-800 text-emerald-300" : "text-slate-400 hover:text-slate-200"}`}>
            <ShieldCheck className="h-4 w-4" />ATS Analyzer
          </button>
        </div>
      </div>

      {activeTab === "analyzer" ? (
        <AtsAnalyzerTab resume={resume} onLoadSampleData={() => serializeResumeData(resume)} />
      ) : (
        <>
          {/* ---------- BUILDER TAB (existing UI preserved) ---------- */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
            {/* LEFT: Form */}
            <div className="space-y-6">
              {/* Contact */}
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><Mail className="h-5 w-5 text-emerald-400" />Contact Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input value={resume.fullName} onChange={(e) => setResume({ ...resume, fullName: e.target.value })} placeholder="Full Name"
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                  <input value={resume.email} onChange={(e) => setResume({ ...resume, email: e.target.value })} placeholder="Email"
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                  <input value={resume.phone} onChange={(e) => setResume({ ...resume, phone: e.target.value })} placeholder="Phone"
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                  <input value={resume.website} onChange={(e) => setResume({ ...resume, website: e.target.value })} placeholder="Website"
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                  <input value={resume.github} onChange={(e) => setResume({ ...resume, github: e.target.value })} placeholder="GitHub URL"
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                  <input value={resume.linkedin} onChange={(e) => setResume({ ...resume, linkedin: e.target.value })} placeholder="LinkedIn URL"
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                </div>
              </div>

              {/* Education */}
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white"><Award className="h-5 w-5 text-emerald-400" />Education</h3>
                  <button onClick={handleAddEducation} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800"><Plus className="h-3.5 w-3.5" />Add</button>
                </div>
                <div className="space-y-4">
                  {resume.education.map((edu, idx) => (
                    <div key={idx} className="relative rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                      <button onClick={() => handleRemoveEducation(idx)} className="absolute right-3 top-3 text-slate-500 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input value={edu.institution} onChange={(e) => { const arr = [...resume.education]; arr[idx] = { ...edu, institution: e.target.value }; setResume({ ...resume, education: arr }); }} placeholder="Institution"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                        <input value={edu.degree} onChange={(e) => { const arr = [...resume.education]; arr[idx] = { ...edu, degree: e.target.value }; setResume({ ...resume, education: arr }); }} placeholder="Degree"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                        <input value={edu.period} onChange={(e) => { const arr = [...resume.education]; arr[idx] = { ...edu, period: e.target.value }; setResume({ ...resume, education: arr }); }} placeholder="Period"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                        <input value={edu.grade} onChange={(e) => { const arr = [...resume.education]; arr[idx] = { ...edu, grade: e.target.value }; setResume({ ...resume, education: arr }); }} placeholder="Grade"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white"><TrendingUp className="h-5 w-5 text-emerald-400" />Experience</h3>
                  <button onClick={handleAddExperience} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800"><Plus className="h-3.5 w-3.5" />Add</button>
                </div>
                <div className="space-y-4">
                  {resume.experience.map((exp, idx) => (
                    <div key={idx} className="relative rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                      <button onClick={() => handleRemoveExperience(idx)} className="absolute right-3 top-3 text-slate-500 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input value={exp.company} onChange={(e) => { const arr = [...resume.experience]; arr[idx] = { ...exp, company: e.target.value }; setResume({ ...resume, experience: arr }); }} placeholder="Company"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                        <input value={exp.role} onChange={(e) => { const arr = [...resume.experience]; arr[idx] = { ...exp, role: e.target.value }; setResume({ ...resume, experience: arr }); }} placeholder="Role"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                        <input value={exp.period} onChange={(e) => { const arr = [...resume.experience]; arr[idx] = { ...exp, period: e.target.value }; setResume({ ...resume, experience: arr }); }} placeholder="Period"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                      </div>
                      <textarea value={exp.description} onChange={(e) => { const arr = [...resume.experience]; arr[idx] = { ...exp, description: e.target.value }; setResume({ ...resume, experience: arr }); }} placeholder="Description" rows={2}
                        className="mt-3 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white"><Sparkles className="h-5 w-5 text-emerald-400" />Projects</h3>
                  <button onClick={handleAddProject} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800"><Plus className="h-3.5 w-3.5" />Add</button>
                </div>
                <div className="space-y-4">
                  {resume.projects.map((proj, idx) => (
                    <div key={idx} className="relative rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                      <button onClick={() => handleRemoveProject(idx)} className="absolute right-3 top-3 text-slate-500 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input value={proj.name} onChange={(e) => { const arr = [...resume.projects]; arr[idx] = { ...proj, name: e.target.value }; setResume({ ...resume, projects: arr }); }} placeholder="Project name"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                        <input value={proj.tech} onChange={(e) => { const arr = [...resume.projects]; arr[idx] = { ...proj, tech: e.target.value }; setResume({ ...resume, projects: arr }); }} placeholder="Tech stack"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                        <input value={proj.link} onChange={(e) => { const arr = [...resume.projects]; arr[idx] = { ...proj, link: e.target.value }; setResume({ ...resume, projects: arr }); }} placeholder="Link"
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none sm:col-span-2" />
                      </div>
                      <textarea value={proj.description} onChange={(e) => { const arr = [...resume.projects]; arr[idx] = { ...proj, description: e.target.value }; setResume({ ...resume, projects: arr }); }} placeholder="Description" rows={2}
                        className="mt-3 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><ChevronDown className="h-5 w-5 text-emerald-400" />Skills</h3>
                <form onSubmit={handleAddSkill} className="mb-3 flex gap-2">
                  <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill…"
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                  <button type="submit" className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"><Plus className="h-4 w-4" /></button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-sm text-slate-200">
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="text-slate-500 hover:text-rose-400"><Trash2 className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Bullet Optimizer (preserved) */}
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><Sparkles className="h-5 w-5 text-emerald-400" />AI Bullet Point Optimizer</h3>
                <textarea value={bulletToOptimize} onChange={(e) => setBulletToOptimize(e.target.value)} rows={3} placeholder="Paste a bullet point to optimize…"
                  className="mb-3 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none" />
                <button onClick={handleOptimizeBullet} disabled={isAiLoading}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-50">
                  {isAiLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Optimizing…</> : <><Sparkles className="h-4 w-4" />Optimize with AI</>}
                </button>
                {aiError && <p className="mt-3 text-sm text-rose-400">{aiError}</p>}
                {aiSuggestions && (
                  <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-200">{aiSuggestions}</div>
                )}
              </div>
            </div>

            {/* RIGHT: Live preview + ATS score (existing) */}
            <div className="space-y-6">
              <div className="sticky top-6 space-y-4">
                {/* Quick ATS score (existing 7-check version) */}
                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
                  <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white"><ShieldCheck className="h-5 w-5 text-emerald-400" />Quick ATS Score</h3>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" stroke="rgba(148,163,184,0.12)" strokeWidth="6" fill="none" />
                        <circle cx="40" cy="40" r="34" stroke="#10b981" strokeWidth="6" strokeLinecap="round" fill="none"
                          strokeDasharray={`${2 * Math.PI * 34}`} strokeDashoffset={`${2 * Math.PI * 34 * (1 - score / 100)}`} />
                      </svg>
                      <span className="absolute text-xl font-bold text-white">{score}</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Compliance score</p>
                      <p className="text-xs text-slate-500">Based on {checklist.length} quick checks</p>
                      <button onClick={() => setActiveTab("analyzer")} className="mt-1 text-xs text-emerald-400 hover:underline">
                        Run deep analyzer →
                      </button>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {checklist.map((c, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        {c.passed ? <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" /> : <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" />}
                        <span className={c.passed ? "text-slate-300" : "text-slate-500"}>{c.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resume preview */}
                <div className="rounded-2xl border border-slate-800/60 bg-white p-6 text-slate-900">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold">Live Preview</h3>
                    <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"><Printer className="h-3.5 w-3.5" />Print</button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold">{resume.fullName || "Your Name"}</h4>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
                        {resume.email && <span>{resume.email}</span>}
                        {resume.phone && <span>{resume.phone}</span>}
                        {resume.website && <span>{resume.website}</span>}
                        {resume.github && <span>{resume.github}</span>}
                        {resume.linkedin && <span>{resume.linkedin}</span>}
                      </div>
                    </div>
                    {resume.experience.length > 0 && (
                      <div>
                        <h5 className="mb-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">Experience</h5>
                        {resume.experience.map((exp, i) => (
                          <div key={i} className="mb-2">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-semibold">{exp.role}{exp.company && ` — ${exp.company}`}</span>
                              <span className="text-xs text-slate-500">{exp.period}</span>
                            </div>
                            <p className="text-xs text-slate-700">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {resume.education.length > 0 && (
                      <div>
                        <h5 className="mb-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">Education</h5>
                        {resume.education.map((edu, i) => (
                          <div key={i} className="mb-2">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-semibold">{edu.degree}</span>
                              <span className="text-xs text-slate-500">{edu.period}</span>
                            </div>
                            <p className="text-xs text-slate-700">{edu.institution}{edu.grade && ` · ${edu.grade}`}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {resume.projects.length > 0 && (
                      <div>
                        <h5 className="mb-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">Projects</h5>
                        {resume.projects.map((p, i) => (
                          <div key={i} className="mb-2">
                            <span className="text-sm font-semibold">{p.name}</span>
                            {p.tech && <span className="text-xs text-slate-500"> · {p.tech}</span>}
                            <p className="text-xs text-slate-700">{p.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {resume.skills.length > 0 && (
                      <div>
                        <h5 className="mb-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">Skills</h5>
                        <p className="text-xs text-slate-700">{resume.skills.join(" · ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
