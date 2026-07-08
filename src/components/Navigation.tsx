/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Code, 
  FileText, 
  MessageSquare, 
  Building2, 
  BrainCircuit, 
  Users, 
  ShieldAlert, 
  Settings as SettingsIcon, 
  Menu, 
  X, 
  Sparkles, 
  Award,
  ChevronRight,
  Flame,
  Zap,
  FolderGit2
} from 'lucide-react';
import { UserStats } from '../types';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userStats: UserStats;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  children?: React.ReactNode;
}

export default function Navigation({ currentTab, setCurrentTab, userStats, theme, setTheme, children }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'dsa', label: 'DSA Module', icon: Code },
    { id: 'resume', label: 'Resume Studio', icon: FileText },
    { id: 'interview', label: 'Interview Hub', icon: MessageSquare },
    { id: 'company', label: 'Company Prep', icon: Building2 },
    { id: 'aptitude', label: 'Aptitude Tests', icon: BrainCircuit },
    { id: 'coach', label: 'AI Coach (Gemini)', icon: Sparkles, highlight: true },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'admin', label: 'Admin Panel', icon: ShieldAlert },
    { id: 'opensource', label: 'Open Source', icon: FolderGit2 },
  ];

  const currentItem = menuItems.find(item => item.id === currentTab);

  return (
    <aside className="relative flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden w-full">
      
      {/* MOBILE HEADER */}
      <header className="flex md:hidden items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 w-full z-50">
        <div className="flex items-center gap-2" onClick={() => setCurrentTab('landing')}>
          <div className="p-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-extrabold text-xl bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
            PrepVerse
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold bg-amber-950/40 px-2 py-1 rounded-full border border-amber-800/30">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{userStats.streak}d</span>
          </div>
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-950/95 z-40 flex flex-col pt-24 px-6 md:hidden">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-xl text-left transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600/30 to-violet-600/20 text-white border-l-4 border-blue-500 font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          
          <div className="mt-auto mb-8 border-t border-slate-800 pt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400">
                PV
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Guest User</p>
                <p className="text-xs text-slate-400">{userStats.xp} XP Earned</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <nav className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-900 px-5 py-6 shrink-0 relative">
        <div className="flex items-center gap-2.5 mb-8 px-2 cursor-pointer" onClick={() => setCurrentTab('landing')}>
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-900/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-black text-2xl bg-gradient-to-r from-blue-400 via-indigo-200 to-violet-300 bg-clip-text text-transparent tracking-tight">
              PrepVerse
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Open Source</p>
          </div>
        </div>

        {/* User Stats Card in Sidebar */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/40 relative overflow-hidden group">
          <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all duration-500" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Your Standing</span>
            <span className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-800/30">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              {userStats.streak}d Streak
            </span>
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-black text-white tracking-tight">{userStats.xp}</span>
            <span className="text-xs text-indigo-400 font-extrabold">XP</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min(100, (userStats.xp % 1000) / 10)}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-1.5 text-right font-medium">Level {Math.floor(userStats.xp / 1000) + 1} ({1000 - (userStats.xp % 1000)} XP to next)</p>
        </div>

        <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all relative group ${
                  isActive 
                    ? 'bg-slate-900 text-white border-l-2 border-blue-500 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-blue-400' : 'group-hover:text-slate-200'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.highlight ? (
                  <span className="text-[9px] bg-indigo-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                    AI
                  </span>
                ) : (
                  isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer/Settings button in sidebar */}
        <div className="mt-auto pt-4 border-t border-slate-900 flex flex-col gap-3">
          <button
            onClick={() => setCurrentTab('settings')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
              currentTab === 'settings' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-950'
            }`}
          >
            <SettingsIcon className="w-4.5 h-4.5" />
            <span>Settings</span>
          </button>
          
          <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-900/30 rounded-xl border border-slate-900">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-black text-white">
              PV
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Guest Candidate</p>
              <p className="text-[10px] text-slate-500 truncate">SaaS Free Tier</p>
            </div>
          </div>
        </div>
      </nav>

      {/* CORE CONTENT LAYOUT */}
      <div className="flex-1 flex flex-col min-h-screen bg-slate-950">
        
        {/* DESKTOP HEADER */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2 tracking-tight">
              {currentItem?.label}
              {currentItem?.highlight && (
                <span className="text-[10px] bg-indigo-600/20 text-indigo-400 font-extrabold px-2 py-0.5 rounded border border-indigo-500/30">
                  Powered by Gemini 3.5
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Welcome back, get ready for your placement rounds.</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Quick stats in header */}
            <div className="flex items-center gap-4 text-xs font-semibold bg-slate-900/40 border border-slate-800 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-1.5 text-blue-400">
                <Code className="w-3.5 h-3.5" />
                <span>Solved: {userStats.solvedCount}</span>
              </div>
              <div className="w-px h-4 bg-slate-800" />
              <div className="flex items-center gap-1.5 text-indigo-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Goal: {userStats.completedToday}/{userStats.dailyGoal}</span>
              </div>
            </div>

            <button 
              onClick={() => setCurrentTab('coach')} 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-900/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              Ask AI Coach
            </button>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </aside>
  );
}
