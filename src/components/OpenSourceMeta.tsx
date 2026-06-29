/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  GitBranch, 
  Terminal, 
  Award, 
  Heart, 
  Github, 
  ShieldCheck, 
  Code, 
  ArrowRight,
  BookOpen,
  Users
} from 'lucide-react';

export default function OpenSourceMeta() {
  const scripts = {
    clone: 'git clone https://github.com/prepverse/prepverse.git',
    install: 'npm install\nnpm run dev',
    docker: 'docker build -t prepverse .'
  };

  const bounties = [
    { title: 'Add DP Editorial Tutorials', reward: '+1000 XP', category: 'Documentation', difficulty: 'Medium' },
    { title: 'Optimize SDE PDF Print Margins', reward: '+500 XP', category: 'Frontend UI', difficulty: 'Easy' },
    { title: 'Integrate PostgreSQL Prisma Schema', reward: '+1500 XP', category: 'Backend Dev', difficulty: 'Hard' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      {/* Hero Welcome banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/5 border border-indigo-500/20 relative overflow-hidden group">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500" />
        
        <div className="space-y-4 max-w-2xl">
          <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl w-fit">
            <GitBranch className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Open Source Contribution Hub</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            PrepVerse is completely community-built under the Apache 2.0 License. Clone the codebase, write customized modules, or grab open bounties to claim honorary rankings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 Cols) - Installation & bounties */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Scripts / CLI Guide */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4.5 h-4.5 text-blue-400" />
              Local Repository Setup
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-1">1. Git Clone Project</span>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-slate-300 overflow-x-auto select-all">
                  {scripts.clone}
                </pre>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-1">2. Run Dev Server</span>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-slate-300 overflow-x-auto select-all">
                  {scripts.install}
                </pre>
              </div>
            </div>
          </div>

          {/* Open Bounties List */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-indigo-400" />
              Active Open-Source Bounties
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">Fix outstanding tracker issues or add missing components to receive certified profile milestones.</p>

            <div className="space-y-3 pt-2">
              {bounties.map((bounty, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-900 gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white flex items-center gap-2">
                      {bounty.title}
                      <span className="text-[8px] bg-slate-900 text-slate-500 border border-slate-800 font-bold px-1.5 py-0.5 rounded uppercase">
                        {bounty.category}
                      </span>
                    </p>
                    <p className="text-[10px] text-slate-500">Difficulty: {bounty.difficulty} • Tracked via GitHub milestones</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <span className="text-xs font-extrabold text-indigo-400 bg-indigo-950/40 px-2.5 py-0.5 rounded-full border border-indigo-900/20">
                      {bounty.reward}
                    </span>
                    <button 
                      onClick={() => alert(`Redirecting to Issue detail card logic...`)}
                      className="flex items-center gap-1 bg-slate-900 hover:bg-indigo-600 text-[10px] font-extrabold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 transition-all cursor-pointer"
                    >
                      Claim
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 Cols) - Code of conduct & License */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Apache 2.0 Licensing
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Our project is licensed strictly under the permissive Apache License 2.0. This grants you the complete freedom to modify, host, or privately package PrepVerse as needed, provided that you preserve original copyright descriptors.
            </p>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900 text-[10px] font-mono text-slate-500">
              SPDX-License-Identifier: Apache-2.0
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              Code of Conduct
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We foster a highly inclusive, encouraging, and respectful community environment. Harassment, condescension, or bad faith pull requests will not be tolerated.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
