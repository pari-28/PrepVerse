/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Award, 
  Github, 
  Code, 
  Flame, 
  Compass, 
  Globe, 
  Linkedin, 
  CheckCircle,
  Clock,
  TrendingUp,
  User,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { UserStats } from '../types';

interface ProfileProps {
  userStats: UserStats;
}

export default function Profile({ userStats }: ProfileProps) {
  
  const connectedAccounts = [
    { name: 'GitHub', username: 'janedoe-dev', link: 'https://github.com', icon: Github, color: 'text-white' },
    { name: 'LeetCode', username: 'janedoe_code', link: 'https://leetcode.com', icon: Code, color: 'text-amber-500' },
    { name: 'Codeforces', username: 'janedoe_cf', link: 'https://codeforces.com', icon: Compass, color: 'text-rose-500' }
  ];

  const badges = [
    { name: 'Streak Keeper', desc: 'Preserved a placement prep streak of 5+ days', xpRequired: 100, unlocked: userStats.streak >= 5 },
    { name: 'ATS Master', desc: 'Secured an ATS resume rating above 80%', xpRequired: 500, unlocked: userStats.xp >= 500 },
    { name: 'Algorithmic Pioneer', desc: 'Solved 10+ curated sheet DSA problems', xpRequired: 1000, unlocked: userStats.xp >= 1000 },
    { name: 'SDE Grandmaster', desc: 'Accumulated over 2500 level XP points', xpRequired: 2500, unlocked: userStats.xp >= 2500 }
  ];

  const categoriesProgress = [
    { name: 'Data Structures & Algorithms', count: userStats.solvedCount, total: 150, color: 'bg-blue-500' },
    { name: 'Aptitude & Speed Reasoning', count: 12, total: 30, color: 'bg-emerald-500' },
    { name: 'Operating Systems & DBMS', count: 8, total: 20, color: 'bg-indigo-500' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      {/* Bio / Meta Header */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/40 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl group-hover:scale-125 transition-all duration-500" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-20 h-20 bg-slate-950 rounded-3xl border border-slate-800 flex items-center justify-center font-black text-3xl text-indigo-400">
            {userStats.name[0]}
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-white tracking-tight">{userStats.name}</h2>
            <p className="text-xs text-indigo-450 font-bold">Candidate SDE Intern Placement Pipeline</p>
            <p className="text-[10px] text-slate-500">Member since June 2026 • Verified PrepVerse profile</p>
          </div>
        </div>

        {/* Level Indicator Badge */}
        <div className="text-center bg-slate-950 px-6 py-4 rounded-2xl border border-slate-900 shrink-0">
          <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block mb-1">Rank Level</span>
          <span className="text-3xl font-black text-indigo-400 tracking-tight">Lvl {Math.floor(userStats.xp / 1000) + 1}</span>
          <p className="text-[10px] text-slate-450 font-semibold mt-1">{userStats.xp} Total XP</p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-850">
          <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-1.5">Streak Count</p>
          <div className="flex items-center gap-1.5 text-xl font-black text-white">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{userStats.streak} Days</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-850">
          <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-1.5">Solved DSA</p>
          <div className="flex items-center gap-1.5 text-xl font-black text-white">
            <Code className="w-5 h-5 text-blue-400" />
            <span>{userStats.solvedCount} Problems</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-850">
          <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-1.5">XP Ranks</p>
          <div className="flex items-center gap-1.5 text-xl font-black text-white">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>Top 4.2%</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-850">
          <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-1.5">Global Status</p>
          <div className="flex items-center gap-1.5 text-xl font-black text-white">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Expert</span>
          </div>
        </div>
      </div>

      {/* Connected Accounts & Progress breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Categories progress (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-6">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-indigo-400" />
            Milestones Progress Breakdown
          </h3>

          <div className="space-y-5">
            {categoriesProgress.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">{cat.name}</span>
                  <span className="text-slate-500">{cat.count} / {cat.total} solved</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                  <div 
                    className={`h-full ${cat.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.min(100, (cat.count / cat.total) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Connected Profiles (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4.5 h-4.5 text-blue-400" />
            Integrations & Handles
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">Cross-compile stats and achievements from Leetcode and Github for recruiter reviews.</p>

          <div className="space-y-3 pt-2">
            {connectedAccounts.map((account, idx) => (
              <a 
                key={idx}
                href={account.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-900 text-xs font-bold text-slate-300 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <account.icon className={`w-4.5 h-4.5 ${account.color}`} />
                  <div>
                    <span className="text-xs block text-slate-400">{account.name} Handle</span>
                    <span className="text-white font-bold">{account.username}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Achievement Badges Grid */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4.5 h-4.5 text-amber-400" />
          Gamified Placement Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, idx) => (
            <div 
              key={idx} 
              className={`p-5 rounded-2xl border flex flex-col justify-between h-40 transition-all ${
                badge.unlocked 
                  ? 'bg-indigo-950/25 border-indigo-500/20 text-white' 
                  : 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    badge.unlocked ? 'text-indigo-400' : 'text-slate-600'
                  }`}>
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                  
                  {badge.unlocked ? (
                    <CheckCircle className="w-4 h-4 text-indigo-400 fill-indigo-950" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-700" />
                  )}
                </div>

                <h4 className="text-sm font-bold text-white leading-tight">{badge.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{badge.desc}</p>
              </div>

              {!badge.unlocked && (
                <span className="text-[9px] text-slate-500 font-extrabold block">Requires {badge.xpRequired} XP</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
