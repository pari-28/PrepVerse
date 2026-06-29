/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  CheckCircle, 
  FileText, 
  Users, 
  AlertCircle 
} from 'lucide-react';
import { dsaProblems } from '../data/dsaData';
import { DsaProblem } from '../types';

export default function AdminDashboard() {
  const [problemsList, setProblemsList] = useState<DsaProblem[]>(dsaProblems);
  const [newTitle, setNewTitle] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Arrays & Hashing');
  const [newDescription, setNewDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const stats = [
    { name: 'Curated DSA Problems', count: problemsList.length, color: 'text-blue-400' },
    { name: 'Company Pipelines Guides', count: 3, color: 'text-indigo-400' },
    { name: 'Aptitude Questions', count: 6, color: 'text-emerald-400' },
    { name: 'Active Candidates Registrations', count: 5, color: 'text-amber-400' }
  ];

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newProb: DsaProblem = {
      id: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      difficulty: newDifficulty as any,
      category: newCategory,
      sheets: ['Blind 75'],
      companyTags: ['Amazon', 'Microsoft'],
      description: newDescription,
      constraints: ['1 <= nums.length <= 10^5'],
      sampleInput: 'nums = [1,2,3]',
      sampleOutput: '3',
      editorial: 'Sort and count elements.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      codeTemplate: 'function solve(nums: number[]): number {\n  return 0;\n}'
    };

    setProblemsList(prev => [...prev, newProb]);
    setNewTitle('');
    setNewDescription('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleDeleteProblem = (id: string) => {
    setProblemsList(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Administrative Management Panel</h2>
        <p className="text-xs text-slate-500">Moderation console to monitor placement curricula, add DSA problems, and analyze candidate counts.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest">{stat.name}</span>
            <p className={`text-3xl font-black ${stat.color} tracking-tight mt-1`}>{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (7 Cols) - Add Problem Form */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4.5 h-4.5 text-blue-400" />
            Append Placement DSA Problem
          </h3>

          <form onSubmit={handleAddProblem} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-450 font-bold mb-1">Problem Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Spiral Matrix II"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-450 font-bold mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-450 font-bold mb-1">Category topic</label>
              <input 
                type="text" 
                placeholder="e.g. Dynamic Programming, Trees"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-450 font-bold mb-1">Problem Description</label>
              <textarea 
                rows={4}
                placeholder="Write description markdown context..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {isSuccess && (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Problem appended to core Curriculum!</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Add Problem as Moderator
            </button>
          </form>
        </div>

        {/* Right column (5 Cols) - Problem Catalog List */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4.5 h-4.5 text-indigo-400" />
            Curriculum Registry Moderator
          </h3>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {problemsList.map((prob) => (
              <div 
                key={prob.id}
                className="flex items-center justify-between p-3.5 bg-slate-950/65 rounded-xl border border-slate-900 text-xs text-slate-300"
              >
                <div>
                  <p className="font-bold text-white">{prob.title}</p>
                  <p className="text-[10px] text-slate-500">{prob.category} • {prob.difficulty}</p>
                </div>

                <button 
                  onClick={() => handleDeleteProblem(prob.id)}
                  className="text-slate-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
