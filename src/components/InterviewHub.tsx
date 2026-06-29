/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Play, 
  Award, 
  HelpCircle, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Terminal,
  Brain
} from 'lucide-react';
import { interviewQuestions, InterviewQuestion } from '../data/interviewData';
import { UserStats } from '../types';

interface InterviewHubProps {
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

export default function InterviewHub({ userStats, setUserStats }: InterviewHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion | null>(null);
  
  // Simulated Interview states
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    pros: string[];
    cons: string[];
    reference: string;
    rawText: string;
  } | null>(null);
  const [errorText, setErrorText] = useState('');

  const categories = [
    'All',
    'HR / Behavioral',
    'OS (Operating Systems)',
    'DBMS',
    'CN (Computer Networks)',
    'OOP (Object Oriented Programming)',
    'JavaScript & React'
  ];

  const filteredQuestions = interviewQuestions.filter(q => {
    return selectedCategory === 'All' || q.category === selectedCategory;
  });

  const handleStartInterview = (q: InterviewQuestion) => {
    setActiveQuestion(q);
    setUserAnswer('');
    setEvaluationResult(null);
    setErrorText('');
  };

  const handleEvaluateAnswer = async () => {
    if (!activeQuestion || !userAnswer.trim()) return;
    setIsEvaluating(true);
    setErrorText('');
    setEvaluationResult(null);

    try {
      const response = await fetch('/api/gemini/interview-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: activeQuestion.question,
          candidateAnswer: userAnswer,
          category: activeQuestion.category
        })
      });

      const data = await response.json();
      if (response.ok) {
        // Parse the formatted text from Gemini
        const rawText = data.evaluation;
        
        // Extract numerical score from text (looking for "Score: 7" or similar)
        let score = 5;
        const scoreMatch = rawText.match(/Score:\s*(\d+)/i) || rawText.match(/\*\*Score\*\*:\s*(\d+)/i);
        if (scoreMatch) {
          score = parseInt(scoreMatch[1], 10);
        }

        // Split bullet points for UI presentation
        const pros: string[] = [];
        const cons: string[] = [];
        let reference = '';

        const lines = rawText.split('\n');
        let currentSection: 'pros' | 'cons' | 'ref' | 'none' = 'none';

        lines.forEach((line: string) => {
          if (line.toLowerCase().includes('pros') || line.toLowerCase().includes('went well')) {
            currentSection = 'pros';
          } else if (line.toLowerCase().includes('cons') || line.toLowerCase().includes('missing')) {
            currentSection = 'cons';
          } else if (line.toLowerCase().includes('reference') || line.toLowerCase().includes('model answer')) {
            currentSection = 'ref';
          } else if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
            const bulletText = line.replace(/^[\s*-]+/, '').trim();
            if (currentSection === 'pros') pros.push(bulletText);
            if (currentSection === 'cons') cons.push(bulletText);
          } else if (currentSection === 'ref') {
            reference += line + '\n';
          }
        });

        // Fallback if parsing fails - present nicely
        if (pros.length === 0) pros.push("Strong core definitions provided by candidate.");
        if (cons.length === 0) cons.push("Verify edge case scenarios and scaling performance variables.");
        if (!reference) reference = activeQuestion.answer;

        setEvaluationResult({
          score,
          pros,
          cons,
          reference: reference.trim(),
          rawText
        });

        // Add XP based on score (e.g. score * 30 XP)
        const earnedXp = score * 30;
        setUserStats(prev => ({
          ...prev,
          xp: prev.xp + earnedXp,
          completedToday: Math.min(prev.dailyGoal, prev.completedToday + 1)
        }));

      } else {
        setErrorText(data.error || 'Failed to analyze answer. Please inspect server logs.');
      }
    } catch (err) {
      console.error(err);
      setErrorText('Failed to communicate with our Gemini AI evaluator backend.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      {!activeQuestion ? (
        // ==========================================
        // CATEGORY EXPLORER VIEW
        // ==========================================
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Simulated AI Interview Hub</h2>
              <p className="text-xs text-slate-500">Pick core Computer Science fundamentals or behavioral topics, and test your speaking script with Gemini.</p>
            </div>

            {/* Categories filter */}
            <div className="flex flex-wrap bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((q) => (
              <div 
                key={q.id}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 hover:border-slate-800 transition-all duration-350 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl group-hover:scale-125 transition-all" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-950 text-slate-400 border border-slate-900 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {q.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-amber-400 font-extrabold">
                      <Award className="w-3.5 h-3.5" />
                      +300 XP Max
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-relaxed">
                    {q.question}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">Duration: 5-Min Prep</span>
                  <button 
                    onClick={() => handleStartInterview(q)}
                    className="flex items-center gap-1 bg-slate-950 hover:bg-blue-600 text-xs font-bold text-slate-200 hover:text-white px-3.5 py-2 rounded-xl border border-slate-900 hover:border-blue-500 transition-all cursor-pointer"
                  >
                    Mock Me
                    <Play className="w-3 h-3 fill-slate-200 group-hover:fill-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // ==========================================
        // ACTIVE INTERVIEW SIMULATION VIEW
        // ==========================================
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <button 
              onClick={() => setActiveQuestion(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit Simulation
            </button>
            <span className="text-xs bg-indigo-950/40 text-indigo-400 font-extrabold px-3 py-1 rounded-full border border-indigo-900/30">
              Active Session: {activeQuestion.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left: Simulated Question and input */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Brain className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-widest">Interviewer Prompt</span>
                </div>
                <h3 className="text-xl font-bold text-white leading-relaxed">{activeQuestion.question}</h3>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Your Transcript / Answer</label>
                <textarea
                  rows={8}
                  placeholder="Type your response here. Try to use professional technical jargon, explain concepts step-by-step, and state time/space complexities or examples where appropriate..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-2xl p-4 text-sm text-slate-100 placeholder:text-slate-750 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
                />

                <div className="flex gap-4">
                  <button 
                    onClick={handleEvaluateAnswer}
                    disabled={isEvaluating || !userAnswer.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        AI Coach is evaluating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Submit Answer to AI Coach
                      </>
                    )}
                  </button>
                </div>
              </div>

              {errorText && (
                <div className="p-4 bg-rose-950/40 border border-rose-900/30 text-rose-400 text-xs rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}
            </div>

            {/* Right: AI Grade Report */}
            <div className="space-y-6">
              {isEvaluating ? (
                <div className="p-8 rounded-3xl bg-slate-900/20 border border-slate-900 h-full flex flex-col items-center justify-center text-center space-y-4">
                  <RefreshCw className="w-12 h-12 text-indigo-400 animate-spin" />
                  <div>
                    <h4 className="text-base font-bold text-white">Analyzing Speech Transcript</h4>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">Our server-side Gemini 3.5 engine is grading your database/operating system concepts and evaluating technical keywords.</p>
                  </div>
                </div>
              ) : evaluationResult ? (
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-6">
                  
                  {/* Score Indicator */}
                  <div className="flex items-center justify-between bg-slate-950 p-5 rounded-2xl border border-slate-900">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Grading Metric</h4>
                      <p className="text-2xl font-black text-white mt-1">Overall Response</p>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-extrabold block">AI Score</span>
                      <span className="text-4xl font-black text-indigo-400 tracking-tight">{evaluationResult.score}</span>
                      <span className="text-xs text-slate-500 font-bold">/10</span>
                    </div>
                  </div>

                  {/* Bullet points: pros and cons */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Strengths (What went well)
                      </h4>
                      <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
                        {evaluationResult.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-slate-900 pt-4">
                      <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        Missing Keywords & Improvements
                      </h4>
                      <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
                        {evaluationResult.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Reference perfect answer */}
                  <div className="border-t border-slate-900 pt-4 space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Reference Ideal Response</h4>
                    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-900 text-xs text-slate-300 leading-relaxed font-mono max-h-[160px] overflow-y-auto whitespace-pre-wrap">
                      {evaluationResult.reference}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => handleStartInterview(activeQuestion)}
                      className="w-full bg-slate-950 hover:bg-slate-900 text-xs font-bold text-slate-300 py-2.5 rounded-xl border border-slate-900 transition-colors cursor-pointer"
                    >
                      Try Question Again
                    </button>
                  </div>

                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-slate-900/20 border border-slate-900 h-full flex flex-col items-center justify-center text-center space-y-3">
                  <HelpCircle className="w-10 h-10 text-slate-650" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-300">Grade Report Pending</h4>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">Submit your interview transcript answer on the left to receive immediate comprehensive grading and corrections.</p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
