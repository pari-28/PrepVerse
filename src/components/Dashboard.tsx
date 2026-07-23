import { DashboardSkeleton } from "./SkeletonLoaders";  
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  CheckCircle, 
  Clock, 
  Code, 
  FileText, 
  BrainCircuit, 
  Sparkles, 
  Plus, 
  Play, 
  TrendingUp, 
  Zap,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { UserStats } from '../types';

interface DashboardProps {
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
  setCurrentTab: (tab: string) => void;
}

export default function Dashboard({ userStats, setUserStats, setCurrentTab }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [plannerTasks, setPlannerTasks] = useState([
    { id: '1', title: 'Two Sum Map optimization', day: 'Monday', completed: true },
    { id: '2', title: 'Quantitative Speed quiz', day: 'Tuesday', completed: false },
    { id: '3', title: 'Edit Distance 2D Table editorial', day: 'Wednesday', completed: false },
    { id: '4', title: 'Audit resume project bullet points', day: 'Thursday', completed: true },
    { id: '5', title: 'Mock OS virtual memory round', day: 'Friday', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDay, setNewTaskDay] = useState('Monday');

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const handleToggleTask = (id: string) => {
    const taskToToggle = plannerTasks.find(t => t.id === id);
    if (!taskToToggle) return;

    const nextState = !taskToToggle.completed;

    // 1. Update local planner tasks state
    setPlannerTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: nextState } : task
    ));

    // 2. Perform the user stats side-effect outside the state updater
    if (nextState) {
      setUserStats(stats => ({ 
        ...stats, 
        xp: stats.xp + 50, 
        completedToday: Math.min(stats.dailyGoal, stats.completedToday + 1)
      }));
    } else {
      setUserStats(stats => ({ 
        ...stats, 
        xp: Math.max(0, stats.xp - 50),
        completedToday: Math.max(0, stats.completedToday - 1)
      }));
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setPlannerTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newTaskText,
        day: newTaskDay,
        completed: false
      }
    ]);
    setNewTaskText('');
  };

  const recentSolutions = [
    { name: 'Two Sum', diff: 'Easy', time: '2 hours ago', xp: 100 },
    { name: 'LRU Cache', diff: 'Medium', time: 'Yesterday', xp: 200 },
    { name: 'Valid Anagram', diff: 'Easy', time: '2 days ago', xp: 100 }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* QUICK STATUS OVERVIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Flame Streak card */}
        <div className="p-6 rounded-3xl bg-gradient-to-tr from-amber-500/10 to-orange-600/5 border border-amber-500/20 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Active Daily Streak</h3>
            <div className="p-2.5 bg-amber-500/20 rounded-2xl border border-amber-500/30">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            </div>
          </div>
          <p className="text-4xl font-black text-white tracking-tight mb-2">{userStats.streak} Days</p>
          <p className="text-xs text-slate-400 font-medium">Keep solving 1 problem daily to preserve your placement streak!</p>
        </div>

        {/* Level XP card */}
        <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/5 border border-indigo-500/20 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Accumulated Level</h3>
            <div className="p-2.5 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <p className="text-4xl font-black text-white tracking-tight mb-2">Lvl {Math.floor(userStats.xp / 1000) + 1}</p>
          <p className="text-xs text-slate-400 font-medium">Earned {userStats.xp} total XP. Complete roadmaps and code quizzes to rank up.</p>
        </div>

        {/* Completed goal today card */}
        <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-500/10 to-teal-600/5 border border-emerald-500/20 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Today's Daily Goal</h3>
            <div className="p-2.5 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-4xl font-black text-white tracking-tight mb-2">
            {userStats.completedToday} / {userStats.dailyGoal}
          </p>
          <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden mt-1.5 mb-2">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (userStats.completedToday / userStats.dailyGoal) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 font-medium">Goal: solve 3 items. Complete {userStats.dailyGoal - userStats.completedToday} more today.</p>
        </div>

      </div>

      {/* CORE GRID - QUICK ACTIONS & RADAR CHART / WEEKLY PLANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: WEEKLY PLANNER (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-blue-400" />
                Weekly Preparation Planner
              </h3>
              <p className="text-xs text-slate-500">Plan and check off tasks to secure 50 bonus XP per completed goal.</p>
            </div>
          </div>

          {/* Quick inline task creator */}
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-900">
            <input 
              type="text" 
              placeholder="e.g., Study sliding window pattern, review binary trees..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 focus:outline-none placeholder:text-slate-600"
            />
            <select
              value={newTaskDay}
              onChange={(e) => setNewTaskDay(e.target.value)}
              className="bg-slate-900 text-xs text-slate-300 font-semibold px-3 py-2 rounded-xl focus:outline-none border border-slate-800"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <button 
              type="submit"
              className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors"
            >
              <Plus className="w-4.5 h-4.5" />
            </button>
          </form>

          {/* List of planner tasks grouped by day */}
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
              const dayTasks = plannerTasks.filter(task => task.day === day);
              if (dayTasks.length === 0) return null;
              return (
                <div key={day} className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest px-1">{day}</h4>
                  <div className="grid gap-2">
                    {dayTasks.map(task => (
                      <div 
                        key={task.id}
                        onClick={() => handleToggleTask(task.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                          task.completed 
                            ? 'bg-slate-950/40 border-slate-900/50 opacity-60 line-through text-slate-500' 
                            : 'bg-slate-900/60 border-slate-800/40 hover:bg-slate-900 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={task.completed}
                            onChange={() => {}} // handled by parent div onClick
                            className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                          />
                          <span className="text-sm font-medium">{task.title}</span>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded-full">
                          +50 XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: QUICK ACTIONS (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Quick Placement Actions
            </h3>

            <div className="grid gap-3">
              <button 
                onClick={() => setCurrentTab('dsa')}
                className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-900 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Solve DSA Sheets</p>
                    <p className="text-[10px] text-slate-500">Striver, Blind75 sheets</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
              </button>

              <button 
                onClick={() => setCurrentTab('resume')}
                className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-900 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Audit SDE Resume</p>
                    <p className="text-[10px] text-slate-500">Calculate ATS keyword rating</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </button>

              <button 
                onClick={() => setCurrentTab('aptitude')}
                className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-900 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Timed Aptitude Test</p>
                    <p className="text-[10px] text-slate-500">Math & Logical speed drills</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Interactive performance radar visualization (using clean inline SVG) */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Skill Metrics Gauge
            </h3>

            <div className="flex justify-center items-center h-40">
              <svg viewBox="0 0 200 200" className="w-36 h-36">
                {/* Outer grid */}
                <polygon points="100,20 180,80 150,160 50,160 20,80" fill="none" stroke="#1e293b" strokeWidth="2" />
                <polygon points="100,50 160,95 137.5,145 62.5,145 40,95" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2" />
                <polygon points="100,80 140,110 125,130 75,130 60,110" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2" />
                {/* Spiders lines */}
                <line x1="100" y1="100" x2="100" y2="20" stroke="#1e293b" strokeWidth="1" />
                <line x1="100" y1="100" x2="180" y2="80" stroke="#1e293b" strokeWidth="1" />
                <line x1="100" y1="100" x2="150" y2="160" stroke="#1e293b" strokeWidth="1" />
                <line x1="100" y1="100" x2="50" y2="160" stroke="#1e293b" strokeWidth="1" />
                <line x1="100" y1="100" x2="20" y2="80" stroke="#1e293b" strokeWidth="1" />
                
                {/* Filled actual skill polygon */}
                {/* DSA (85%), Resumes (65%), Interviews (55%), Aptitude (75%), OS/DBMS (60%) */}
                <polygon points="100,32 152,87 127.5,133 62.5,145 52,88" fill="rgba(79, 70, 229, 0.25)" stroke="#6366f1" strokeWidth="2" />
                
                {/* Text Labels */}
                <text x="100" y="15" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">DSA</text>
                <text x="185" y="80" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="start">RESUME</text>
                <text x="155" y="170" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">CORE CS</text>
                <text x="45" y="170" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">APTITUDE</text>
                <text x="15" y="80" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="end">MOCK</text>
              </svg>
            </div>
            <div className="flex justify-between text-center gap-1">
              <div>
                <p className="text-[10px] text-slate-500 font-extrabold uppercase">DSA</p>
                <p className="text-xs font-bold text-white">85%</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-extrabold uppercase">Resume</p>
                <p className="text-xs font-bold text-white">65%</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-extrabold uppercase">Core CS</p>
                <p className="text-xs font-bold text-white">60%</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-extrabold uppercase">Aptitude</p>
                <p className="text-xs font-bold text-white">75%</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* RECENTLY SOLVED PROBLEM LOG */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          Recently Solved & Bookmarked Problems
        </h3>
        
        <div className="grid gap-3">
          {recentSolutions.map((sol, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-900 gap-4 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{sol.name}</h4>
                  <p className="text-xs text-slate-500">Solved {sol.time} • Marked Complete</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  sol.diff === 'Easy' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' : 'bg-amber-950/40 text-amber-400 border border-amber-900/30'
                }`}>
                  {sol.diff}
                </span>
                <span className="text-xs font-extrabold text-slate-400">+{sol.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
