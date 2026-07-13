import React from "react";

/* ── Shimmer animation ── */
const shimmerClass = `
  animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5
  bg-[length:600px_100%]
`;

/* ── Base skeleton block ── */
interface SkeletonProps {
  w?: string;
  h?: string;
  rounded?: string;
  className?: string;
}

function Sk({ w = "100%", h = "12px", rounded = "rounded-md", className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`${shimmerClass} ${rounded} ${className}`}
      style={{ width: w, height: h, flexShrink: 0 }}
    />
  );
}

function SkPill({ w, h, className }: SkeletonProps) {
  return <Sk w={w} h={h} rounded="rounded-full" className={className} />;
}

function SkCircle({ size = "32px", className = "" }: { size?: string; className?: string }) {
  return <Sk w={size} h={size} rounded="rounded-full" className={className} />;
}

/* ══════════════════════════════
   1. DASHBOARD
══════════════════════════════ */
export function DashboardSkeleton() {
  const statWidths: number[] = [55, 65, 45, 60];
  const activityWidths: number[] = [55, 65, 45];

  return (
    <div role="status" aria-label="Loading dashboard" className="flex flex-col gap-3 p-4">
      <div className="grid grid-cols-4 gap-3">
        {statWidths.map((w: number, i: number) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
            <SkPill w={`${w}%`} h="11px" />
            <Sk w="50%" h="26px" />
            <SkPill w="40%" h="9px" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
          <Sk w="45%" h="14px" />
          <Sk w="100%" h="130px" />
          <div className="flex gap-2">
            <SkPill w="70px" h="10px" />
            <SkPill w="70px" h="10px" />
            <SkPill w="70px" h="10px" />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-0">
          <Sk w="50%" h="14px" className="mb-4" />
          {activityWidths.map((w: number, i: number) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
              <SkCircle size="32px" />
              <div className="flex flex-col gap-1 flex-1">
                <Sk w={`${w}%`} h="11px" />
                <Sk w="80%" h="9px" />
              </div>
              <SkPill w="50px" h="20px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   2. RESUME STUDIO
══════════════════════════════ */
export function ResumeStudioSkeleton() {
  const formFields: Array<[string, string]> = [
    ["35%", "36px"],
    ["25%", "36px"],
    ["40%", "72px"],
  ];
  const previewLines: number[] = [90, 75, 85];
  const bulletLines: number[] = [70, 80, 60];
  const tagWidths: number[] = [65, 80, 55, 90];
  const pillWidths: number[] = [50, 65, 45];

  return (
    <div role="status" aria-label="Loading resume studio" className="grid grid-cols-[1fr_1.4fr] gap-4 p-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
        <Sk w="60%" h="14px" />
        {formFields.map((field: [string, string], i: number) => (
          <div key={i} className="flex flex-col gap-1">
            <Sk w={field[0]} h="10px" />
            <Sk w="100%" h={field[1]} rounded="rounded-lg" />
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
          <Sk w="45%" h="12px" />
          <div className="flex flex-wrap gap-2">
            {tagWidths.map((w: number, i: number) => (
              <div key={i}>
                <SkPill w={`${w}px`} h="24px" />
              </div>
            ))}
          </div>
        </div>
        <Sk w="100%" h="36px" rounded="rounded-lg" />
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Sk w="40%" h="14px" />
          <SkPill w="80px" h="28px" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col gap-3">
          <Sk w="55%" h="18px" className="mx-auto" />
          <Sk w="40%" h="11px" className="mx-auto" />
          <div className="flex flex-col gap-1 mt-2">
            {previewLines.map((w: number, i: number) => (
              <div key={i}>
                <Sk w={`${w}%`} h="10px" />
              </div>
            ))}
          </div>
          <Sk w="40%" h="13px" className="mt-2" />
          {bulletLines.map((w: number, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <SkCircle size="6px" />
              <Sk w={`${w}%`} h="9px" />
            </div>
          ))}
          <Sk w="35%" h="13px" className="mt-2" />
          <div className="flex gap-2 flex-wrap">
            {pillWidths.map((w: number, i: number) => (
              <div key={i}>
                <SkPill w={`${w}px`} h="20px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   3. COMPANY PREPARATION
══════════════════════════════ */
interface CompanyItem {
  nw: string;
  dw: string;
  tags: number[];
}

export function CompanyPrepSkeleton() {
  const companies: CompanyItem[] = [
    { nw: "35%", dw: "55%", tags: [75, 90, 60] },
    { nw: "28%", dw: "60%", tags: [85, 70, 95] },
    { nw: "40%", dw: "50%", tags: [60, 80, 75] },
  ];

  return (
    <div role="status" aria-label="Loading company preparation" className="flex flex-col gap-3 p-4">
      <div className="flex gap-3">
        <Sk w="100%" h="38px" rounded="rounded-lg" className="flex-1" />
        <SkPill w="110px" h="38px" />
        <SkPill w="90px" h="38px" />
      </div>
      {companies.map((item: CompanyItem, i: number) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SkCircle size="44px" />
            <div className="flex flex-col gap-2 flex-1">
              <Sk w={item.nw} h="14px" />
              <Sk w={item.dw} h="10px" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <SkPill w="65px" h="22px" />
              <Sk w="80px" h="9px" />
            </div>
          </div>
          <div className="border-t border-white/10 pt-3 flex gap-2">
            {item.tags.map((w: number, j: number) => (
              <div key={j}>
                <SkPill w={`${w}px`} h="22px" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════
   4. DSA MODULE
══════════════════════════════ */
interface DSACard {
  bw: number;
  tw: number;
  dw: number;
}

export function DSAModuleSkeleton() {
  const sidebarItems: number[] = [1, 2, 3, 4, 5];
  const tagWidths: number[] = [45, 55, 40, 60];
  const descLines: number[] = [90, 75, 82];
  const cards: DSACard[] = [
    { bw: 55, tw: 70, dw: 90 },
    { bw: 45, tw: 80, dw: 75 },
    { bw: 60, tw: 65, dw: 85 },
  ];

  return (
    <div role="status" aria-label="Loading DSA module" className="grid grid-cols-[220px_1fr] gap-4 p-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
        <Sk w="65%" h="13px" />
        {sidebarItems.map((i: number) => (
          <div key={i}>
            <SkPill w="100%" h="32px" />
          </div>
        ))}
        <div className="border-t border-white/10 my-1" />
        <Sk w="55%" h="11px" />
        <div className="flex flex-wrap gap-2">
          {tagWidths.map((w: number, i: number) => (
            <div key={i}>
              <SkPill w={`${w}px`} h="20px" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Sk w="50%" h="15px" />
            <SkPill w="70px" h="22px" />
          </div>
          <Sk w="100%" h="100px" />
          <div className="flex flex-col gap-1">
            {descLines.map((w: number, i: number) => (
              <div key={i}>
                <Sk w={`${w}%`} h="9px" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {cards.map((item: DSACard, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-2">
              <SkPill w={`${item.bw}px`} h="18px" />
              <Sk w={`${item.tw}%`} h="13px" />
              <Sk w={`${item.dw}%`} h="9px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   5. AI COACH
══════════════════════════════ */
interface ChatBubble {
  side: "left" | "right";
  lines: number[];
}

export function AICoachSkeleton() {
  const bubbles: ChatBubble[] = [
    { side: "left", lines: [90, 75, 50] },
    { side: "right", lines: [100, 65] },
    { side: "left", lines: [85, 70, 90, 55] },
  ];
  const progressBars: number[] = [40, 35, 45];
  const suggestions: number[] = [80, 65, 75];

  return (
    <div role="status" aria-label="Loading AI coach" className="grid grid-cols-[1fr_280px] gap-4 p-4">
      <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <Sk w="40%" h="14px" />
          <SkPill w="80px" h="28px" />
        </div>
        <div className="flex flex-col gap-4 p-4 flex-1">
          {bubbles.map((bubble: ChatBubble, i: number) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${bubble.side === "right" ? "justify-end" : ""}`}
            >
              {bubble.side === "left" && <SkCircle size="32px" />}
              <div
                className={`bg-white/5 border border-white/10 p-3 flex flex-col gap-1 ${
                  bubble.side === "left"
                    ? "rounded-[0_10px_10px_10px] max-w-[75%]"
                    : "rounded-[10px_0_10px_10px] max-w-[70%]"
                }`}
              >
                {bubble.lines.map((w: number, j: number) => (
                  <div key={j}>
                    <Sk w={`${w}%`} h="9px" />
                  </div>
                ))}
              </div>
              {bubble.side === "right" && <SkCircle size="32px" />}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-white/10">
          <Sk w="100%" h="38px" rounded="rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
          <Sk w="60%" h="13px" />
          {progressBars.map((lw: number, i: number) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Sk w={`${lw}%`} h="10px" />
                <Sk w="25%" h="10px" />
              </div>
              <SkPill w="100%" h="6px" />
            </div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
          <Sk w="55%" h="13px" />
          {suggestions.map((w: number, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <SkCircle size="8px" />
              <Sk w={`${w}%`} h="10px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SkeletonLoaders = {
  dashboard: DashboardSkeleton,
  resumeStudio: ResumeStudioSkeleton,
  companyPrep: CompanyPrepSkeleton,
  dsaModule: DSAModuleSkeleton,
  aiCoach: AICoachSkeleton,
};

export default SkeletonLoaders;