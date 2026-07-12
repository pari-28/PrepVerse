import React from "react";

/* ── Shimmer animation ── */
const shimmerClass = `
  animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5
  bg-[length:600px_100%]
`;

/* ── Base skeleton block ── */
function Sk({
  w = "100%",
  h = "12px",
  rounded = "rounded-md",
  className = "",
}: {
  w?: string;
  h?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${shimmerClass} ${rounded} ${className}`}
      style={{ width: w, height: h, flexShrink: 0 }}
    />
  );
}

function SkPill(props: React.ComponentProps<typeof Sk>) {
  return <Sk rounded="rounded-full" {...props} />;
}

function SkCircle({ size = "32px", className = "" }: { size?: string; className?: string }) {
  return <Sk w={size} h={size} rounded="rounded-full" className={className} />;
}

/* ══════════════════════════════
   1. DASHBOARD
══════════════════════════════ */
export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard" className="flex flex-col gap-3 p-4">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {[55, 65, 45, 60].map((w, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
            <SkPill w={`${w}%`} h="11px" />
            <Sk w="50%" h="26px" />
            <SkPill w="40%" h="9px" />
          </div>
        ))}
      </div>
      {/* Chart + Activity */}
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
          {[55, 65, 45].map((w, i) => (
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
  return (
    <div role="status" aria-label="Loading resume studio" className="grid grid-cols-[1fr_1.4fr] gap-4 p-4">
      {/* Editor */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
        <Sk w="60%" h="14px" />
        {([["35%", "36px"], ["25%", "36px"], ["40%", "72px"]] as [string, string][]).map(([lw, ih], i) => (
          <div key={i} className="flex flex-col gap-1">
            <Sk w={lw} h="10px" />
            <Sk w="100%" h={ih} rounded="rounded-lg" />
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
          <Sk w="45%" h="12px" />
          <div className="flex flex-wrap gap-2">
            {[65, 80, 55, 90].map((w, i) => <SkPill key={i} w={`${w}px`} h="24px" />)}
          </div>
        </div>
        <Sk w="100%" h="36px" rounded="rounded-lg" />
      </div>
      {/* Preview */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Sk w="40%" h="14px" />
          <SkPill w="80px" h="28px" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col gap-3">
          <Sk w="55%" h="18px" className="mx-auto" />
          <Sk w="40%" h="11px" className="mx-auto" />
          <div className="flex flex-col gap-1 mt-2">
            {[90, 75, 85].map((w, i) => <Sk key={i} w={`${w}%`} h="10px" />)}
          </div>
          <Sk w="40%" h="13px" className="mt-2" />
          {[70, 80, 60].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <SkCircle size="6px" />
              <Sk w={`${w}%`} h="9px" />
            </div>
          ))}
          <Sk w="35%" h="13px" className="mt-2" />
          <div className="flex gap-2 flex-wrap">
            {[50, 65, 45].map((w, i) => <SkPill key={i} w={`${w}px`} h="20px" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   3. COMPANY PREPARATION
══════════════════════════════ */
export function CompanyPrepSkeleton() {
  return (
    <div role="status" aria-label="Loading company preparation" className="flex flex-col gap-3 p-4">
      <div className="flex gap-3">
        <Sk w="100%" h="38px" rounded="rounded-lg" className="flex-1" />
        <SkPill w="110px" h="38px" />
        <SkPill w="90px" h="38px" />
      </div>
      {[
        { nw: "35%", dw: "55%", tags: [75, 90, 60] },
        { nw: "28%", dw: "60%", tags: [85, 70, 95] },
        { nw: "40%", dw: "50%", tags: [60, 80, 75] },
      ].map((item, i) => (
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
            {item.tags.map((w, j) => <SkPill key={j} w={`${w}px`} h="22px" />)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════
   4. DSA MODULE
══════════════════════════════ */
export function DSAModuleSkeleton() {
  return (
    <div role="status" aria-label="Loading DSA module" className="grid grid-cols-[220px_1fr] gap-4 p-4">
      {/* Sidebar */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
        <Sk w="65%" h="13px" />
        {[1, 2, 3, 4, 5].map((i) => <SkPill key={i} w="100%" h="32px" />)}
        <div className="border-t border-white/10 my-1" />
        <Sk w="55%" h="11px" />
        <div className="flex flex-wrap gap-2">
          {[45, 55, 40, 60].map((w, i) => <SkPill key={i} w={`${w}px`} h="20px" />)}
        </div>
      </div>
      {/* Main */}
      <div className="flex flex-col gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Sk w="50%" h="15px" />
            <SkPill w="70px" h="22px" />
          </div>
          <Sk w="100%" h="100px" />
          <div className="flex flex-col gap-1">
            {[90, 75, 82].map((w, i) => <Sk key={i} w={`${w}%`} h="9px" />)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ bw: 55, tw: 70, dw: 90 }, { bw: 45, tw: 80, dw: 75 }, { bw: 60, tw: 65, dw: 85 }].map((item, i) => (
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
export function AICoachSkeleton() {
  return (
    <div role="status" aria-label="Loading AI coach" className="grid grid-cols-[1fr_280px] gap-4 p-4">
      {/* Chat */}
      <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <Sk w="40%" h="14px" />
          <SkPill w="80px" h="28px" />
        </div>
        <div className="flex flex-col gap-4 p-4 flex-1">
          {/* AI bubble */}
          <div className="flex items-start gap-3">
            <SkCircle size="32px" />
            <div className="bg-white/5 border border-white/10 rounded-[0_10px_10px_10px] p-3 max-w-[75%] flex flex-col gap-1">
              {[90, 75, 50].map((w, i) => <Sk key={i} w={`${w}%`} h="9px" />)}
            </div>
          </div>
          {/* User bubble */}
          <div className="flex items-start gap-3 justify-end">
            <div className="bg-white/5 border border-white/10 rounded-[10px_0_10px_10px] p-3 max-w-[70%] flex flex-col gap-1">
              {[100, 65].map((w, i) => <Sk key={i} w={`${w}%`} h="9px" />)}
            </div>
            <SkCircle size="32px" />
          </div>
          {/* AI bubble */}
          <div className="flex items-start gap-3">
            <SkCircle size="32px" />
            <div className="bg-white/5 border border-white/10 rounded-[0_10px_10px_10px] p-3 max-w-[80%] flex flex-col gap-1">
              {[85, 70, 90, 55].map((w, i) => <Sk key={i} w={`${w}%`} h="9px" />)}
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-white/10">
          <Sk w="100%" h="38px" rounded="rounded-lg" />
        </div>
      </div>
      {/* Side panels */}
      <div className="flex flex-col gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
          <Sk w="60%" h="13px" />
          {[40, 35, 45].map((lw, i) => (
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
          {[80, 65, 75].map((w, i) => (
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

/* ── Default export map for dynamic use ── */
const SkeletonLoaders = {
  dashboard: DashboardSkeleton,
  resumeStudio: ResumeStudioSkeleton,
  companyPrep: CompanyPrepSkeleton,
  dsaModule: DSAModuleSkeleton,
  aiCoach: AICoachSkeleton,
};

export default SkeletonLoaders;