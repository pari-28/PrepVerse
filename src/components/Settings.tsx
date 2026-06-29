/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sliders, 
  User, 
  Target, 
  Bell, 
  Database, 
  CheckCircle,
  HelpCircle,
  Lock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { UserStats } from '../types';

interface SettingsProps {
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

export default function Settings({ userStats, setUserStats }: SettingsProps) {
  const [name, setName] = useState(userStats.name);
  const [dailyGoal, setDailyGoal] = useState(userStats.dailyGoal);
  const [targetRole, setTargetRole] = useState('Software Development Engineer (SDE)');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifStreak, setNotifStreak] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserStats(prev => ({
      ...prev,
      name,
      dailyGoal
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Candidate Settings</h2>
        <p className="text-xs text-slate-500">Configure target placement milestones, modify candidate profiles, and set study alerts.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left column (8 Cols) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Section: Profile Info */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Candidate Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-450 font-bold mb-1">Display Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-450 font-bold mb-1">Target Placement Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="SDE">Software Development Engineer (SDE)</option>
                  <option value="Frontend">Frontend Engineer</option>
                  <option value="Backend">Backend Engineer</option>
                  <option value="SystemArchitect">Systems / Infrastructure Architect</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Preparation Goals */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              Daily Preparation Target
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-450 font-bold mb-1">Daily Solved Problems Target</label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 5].map(num => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setDailyGoal(num)}
                      className={`px-4 py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                        dailyGoal === num 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow' 
                          : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      {num} {num === 1 ? 'Task' : 'Tasks'}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-550 mt-1.5 leading-relaxed">Adjusts the target constraints on your home screen progress gauge.</p>
              </div>
            </div>
          </div>

          {/* Section: Notifications */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              Notifications & Alerts
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-900">
                <div>
                  <p className="font-bold">Email Digest</p>
                  <p className="text-[10px] text-slate-500">Receive weekly resume feedback and milestones reviews.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifEmail}
                  onChange={(e) => setNotifEmail(e.target.checked)}
                  className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 w-4.5 h-4.5"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-900">
                <div>
                  <p className="font-bold">Streak Alerts</p>
                  <p className="text-[10px] text-slate-500">Alert me 2 hours before midnight if I haven't solved a daily sheet question.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifStreak}
                  onChange={(e) => setNotifStreak(e.target.checked)}
                  className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 w-4.5 h-4.5"
                />
              </div>
            </div>
          </div>

          {/* Saved Notification */}
          {isSaved && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 text-xs rounded-2xl flex items-center gap-2">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>Settings updated successfully! Changes synced with home stats gauge.</span>
            </div>
          )}

          {/* Action button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Save Preference Configurations
          </button>

        </div>

        {/* Right column (4 Cols) */}
        <div className="md:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Data Control
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">Manage your database synchronization states, cloud endpoints, and sandbox logs.</p>
            
            <div className="space-y-2 text-xs">
              <button 
                type="button"
                onClick={() => alert('Local cache cleared successfully!')}
                className="w-full flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-900 text-left transition-colors cursor-pointer"
              >
                <div>
                  <span className="font-bold text-white block">Purge Local Storage</span>
                  <span className="text-[9px] text-slate-500">Resets local settings to default</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-650" />
              </button>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
