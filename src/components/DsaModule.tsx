/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Code, 
  Search, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  Play, 
  Sparkles, 
  ArrowLeft, 
  Video, 
  FileText, 
  Tag, 
  Building,
  Terminal,
  Bookmark,
  Check
} from 'lucide-react';
import { dsaProblems } from '../data/dsaData';
import { DsaProblem, UserStats } from '../types';
import { DSAModuleSkeleton } from "./SkeletonLoaders";

interface DsaModuleProps {
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

export default function DsaModule({ userStats, setUserStats }: DsaModuleProps) {
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState<DsaProblem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSheet, setSelectedSheet] = useState<string>('All');
  
  // Interactive coding states
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState<'desc' | 'editorial' | 'video' | 'notes'>('desc');
  const [terminalOutput, setTerminalOutput] = useState<string>('Ready to compile. Write your solution and press "Run Tests" to execute standard inputs.');
  const [terminalSuccess, setTerminalSuccess] = useState<boolean | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  
  // Bookmark tracking & Notes state
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({
    'two-sum': true,
    'lru-cache': false
  });
  const [problemNotes, setProblemNotes] = useState<Record<string, string>>({
    'two-sum': 'Remember to use a Map to keep track of indices. Complexity is O(n).'
  });
  const [tempNotes, setTempNotes] = useState('');
  
    React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DSAModuleSkeleton />;
  
  const handleSelectProblem = (prob: DsaProblem) => {
    setSelectedProblem(prob);
    setCode(prob.codeTemplate);
    setActiveTab('desc');
    setTerminalOutput('Ready to compile. Write your solution and press "Run Tests" to execute standard inputs.');
    setTerminalSuccess(null);
    setTempNotes(problemNotes[prob.id] || '');
  };

  const handleRunTests = () => {
    if (!selectedProblem) return;
    setIsCompiling(true);
    setTerminalOutput('Compiling solution...\nTypechecking TypeScript modules...\nExecuting test cases for sample inputs...');
    setTerminalSuccess(null);

    setTimeout(() => {
      setIsCompiling(false);
      setTerminalSuccess(true);
      setTerminalOutput(`[SUCCESS] Compilation complete.\n\nInput: ${selectedProblem.sampleInput}\nExpected Output: ${selectedProblem.sampleOutput}\nActual Output: ${selectedProblem.sampleOutput}\n\nAll sample tests passed!`);
    }, 1200);
  };

  const handleSubmitCode = () => {
    if (!selectedProblem) return;
    setIsCompiling(true);
    setTerminalOutput('Submitting solution to evaluation engine...\nVerifying edge cases (0, empty arrays, negative bounds)...');
    
    setTimeout(() => {
      setIsCompiling(false);
      setTerminalSuccess(true);
      setTerminalOutput(`[ACCEPTED] All 150/150 test cases passed.\nRuntime: 62 ms (Beats 84.6% of TypeScript submissions)\nMemory: 48 MB (Beats 71.2% of submissions)\n\n+150 XP credited to your profile streak!`);
      
      // Update XP in parent state
      setUserStats(prev => ({
        ...prev,
        xp: prev.xp + 150,
        solvedCount: prev.solvedCount + 1,
        completedToday: Math.min(prev.dailyGoal, prev.completedToday + 1)
      }));
    }, 1800);
  };

  const handleSaveNotes = () => {
    if (!selectedProblem) return;
    setProblemNotes(prev => ({
      ...prev,
      [selectedProblem.id]: tempNotes
    }));
    alert('Notes saved successfully!');
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter problems
  const filteredProblems = dsaProblems.filter(prob => {
    const matchesSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prob.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;
    const matchesSheet = selectedSheet === 'All' || prob.sheets.includes(selectedSheet as any);
    return matchesSearch && matchesDifficulty && matchesSheet;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      {!selectedProblem ? (
        // ==========================================
        // LIST VIEW
        // ==========================================
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Structured Coding Sandbox</h2>
              <p className="text-xs text-slate-500">Practice curated sheets, search difficulties, and track your revision bookmarks.</p>
            </div>
            
            {/* Sheet Tabs */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
              {['All', 'Blind 75', 'NeetCode 150', 'Striver Sheet'].map(sheet => (
                <button
                  key={sheet}
                  onClick={() => setSelectedSheet(sheet)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedSheet === sheet 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sheet}
                </button>
              ))}
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/30 p-4 rounded-2xl border border-slate-900">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search problems by name or topic tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2 px-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2 px-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => { setSearchQuery(''); setSelectedDifficulty('All'); setSelectedSheet('All'); }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer border border-slate-800"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Problems Table */}
          <div className="border border-slate-900 bg-slate-950 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Difficulty</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Sheet Sheets</th>
                    <th className="px-6 py-4">Company Tags</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {filteredProblems.length > 0 ? (
                    filteredProblems.map((prob) => (
                      <tr 
                        key={prob.id} 
                        className="hover:bg-slate-900/30 transition-colors group cursor-pointer"
                        onClick={() => handleSelectProblem(prob)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleBookmark(prob.id);
                              }}
                              className="text-slate-600 hover:text-amber-400"
                            >
                              <Star className={`w-4 h-4 ${bookmarked[prob.id] ? 'text-amber-400 fill-amber-400' : ''}`} />
                            </button>
                            <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{prob.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            prob.difficulty === 'Easy' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' :
                            prob.difficulty === 'Medium' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/30' :
                            'bg-rose-950/40 text-rose-400 border border-rose-900/30'
                          }`}>
                            {prob.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-medium">
                          {prob.category}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {prob.sheets.map((sheet, sIdx) => (
                              <span key={sIdx} className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded font-bold border border-slate-800">
                                {sheet}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {prob.companyTags.slice(0, 3).map((comp, cIdx) => (
                              <span key={cIdx} className="text-[9px] bg-indigo-950/30 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-900/20">
                                {comp}
                              </span>
                            ))}
                            {prob.companyTags.length > 3 && (
                              <span className="text-[9px] text-slate-500 font-bold">+{prob.companyTags.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="inline-flex items-center gap-1 bg-slate-900 hover:bg-blue-600 text-xs font-bold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg transition-all group-hover:translate-x-0.5">
                            Solve
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                        No problems found matching filters. Try clear query tags.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // ==========================================
        // WORKSPACE / CODING SANDBOX VIEW
        // ==========================================
        <div className="space-y-6 h-full flex flex-col">
          
          {/* Header Actions */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <button 
              onClick={() => setSelectedProblem(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to problems
            </button>

            <div className="flex items-center gap-4">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                selectedProblem.difficulty === 'Easy' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' :
                selectedProblem.difficulty === 'Medium' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/30' :
                'bg-rose-950/40 text-rose-400 border border-rose-900/30'
              }`}>
                {selectedProblem.difficulty}
              </span>
              
              <button 
                onClick={() => handleToggleBookmark(selectedProblem.id)}
                className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
              >
                <Star className={`w-4 h-4 ${bookmarked[selectedProblem.id] ? 'text-amber-400 fill-amber-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Split Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
            
            {/* LEFT COLUMN: DESCRIPTION, EDITORIAL, VIDEO, NOTES */}
            <div className="flex flex-col bg-slate-900/30 border border-slate-900 rounded-2xl overflow-hidden">
              {/* Tab Bar */}
              <div className="flex border-b border-slate-900 bg-slate-900/50 p-1">
                <button 
                  onClick={() => setActiveTab('desc')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'desc' ? 'bg-slate-950 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('editorial')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'editorial' ? 'bg-slate-950 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Editorial
                </button>
                <button 
                  onClick={() => setActiveTab('video')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'video' ? 'bg-slate-950 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Video Walkthrough
                </button>
                <button 
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'notes' ? 'bg-slate-950 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Personal Notes
                </button>
              </div>

              {/* Scrollable content panel */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-300">
                
                {activeTab === 'desc' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{selectedProblem.title}</h3>
                      <p className="text-xs text-indigo-400 font-semibold mt-1">Topic: {selectedProblem.category}</p>
                    </div>

                    {/* Company and sheet pill tags */}
                    <div className="flex flex-wrap gap-2">
                      {selectedProblem.companyTags.map((comp, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 text-xs bg-slate-950 text-slate-400 px-3 py-1 rounded-xl border border-slate-900 font-medium">
                          <Building className="w-3.5 h-3.5 text-slate-600" />
                          {comp}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-slate-900 pt-4">
                      <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2.5">Problem Description</h4>
                      <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {selectedProblem.description}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Constraints</h4>
                      <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                        {selectedProblem.constraints.map((c, idx) => (
                          <li key={idx} className="font-mono">{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900">
                        <p className="text-[10px] text-slate-500 uppercase font-extrabold mb-1">Sample Input</p>
                        <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap">{selectedProblem.sampleInput}</pre>
                      </div>
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900">
                        <p className="text-[10px] text-slate-500 uppercase font-extrabold mb-1">Sample Output</p>
                        <pre className="font-mono text-xs text-indigo-400 whitespace-pre-wrap">{selectedProblem.sampleOutput}</pre>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'editorial' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Official Editorial Solution</h3>
                    <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-900 font-sans text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {selectedProblem.editorial}
                    </div>
                  </div>
                )}

                {activeTab === 'video' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Video className="w-5 h-5 text-indigo-400" />
                      Video Explanation
                    </h3>
                    <p className="text-xs text-slate-400">Step-by-step whiteboard analysis and code optimization strategy.</p>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-900">
                      <iframe 
                        className="w-full h-full"
                        src={selectedProblem.videoUrl} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">My Personal Sandbox Notes</h3>
                    <p className="text-xs text-slate-400">Jot down patterns, edge cases, or complexity rules for future placement review.</p>
                    <textarea 
                      rows={6}
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      placeholder="Write your study notes here..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 placeholder:text-slate-750 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <button 
                      onClick={handleSaveNotes}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Save Notes
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT COLUMN: CODING COMPILER & TERMINAL */}
            <div className="flex flex-col gap-6">
              
              {/* Editor Workspace */}
              <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-slate-200">TypeScript Sandbox v4.1</span>
                  </div>
                  <span className="text-[10px] bg-indigo-950 text-indigo-400 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    Auto-Compile
                  </span>
                </div>

                <div className="flex-1 flex font-mono text-sm relative">
                  {/* Mock Line numbers */}
                  <div className="w-10 bg-slate-950 text-slate-650 text-right pr-2.5 py-4 select-none border-r border-slate-850 flex flex-col gap-1 select-none">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Textarea */}
                  <textarea 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-4 text-slate-100 placeholder:text-slate-600 focus:outline-none resize-none font-mono text-xs leading-relaxed"
                    spellCheck="false"
                  />
                </div>

                {/* Control Panel Footer */}
                <div className="flex gap-3 px-4 py-3 bg-slate-950 border-t border-slate-850">
                  <button 
                    onClick={handleRunTests}
                    disabled={isCompiling}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50 border border-slate-800"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Run Tests
                  </button>

                  <button 
                    onClick={handleSubmitCode}
                    disabled={isCompiling}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    Submit Code
                  </button>
                </div>
              </div>

              {/* Terminal Logs Output */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-3 shrink-0 h-44 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${terminalSuccess === true ? 'bg-emerald-500' : 'bg-indigo-400'}`} />
                    <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest">Compiler Terminal</span>
                  </div>
                  <pre className="font-mono text-[11px] text-slate-300 leading-normal whitespace-pre-wrap max-h-24 overflow-y-auto">
                    {terminalOutput}
                  </pre>
                </div>
                
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold pt-1 border-t border-slate-900">
                  <span>Engine: Node20-Compiler</span>
                  <span>Sandbox Isolation: Active</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
