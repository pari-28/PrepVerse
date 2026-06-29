/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RefreshCw, 
  Award,
  ChevronRight,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { aptitudeQuestions } from '../data/aptitudeData';
import { AptitudeQuestion, UserStats } from '../types';

interface AptitudeProps {
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

export default function Aptitude({ userStats, setUserStats }: AptitudeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Quiz Active States
  const [activeQuestions, setActiveQuestions] = useState<AptitudeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answersLog, setAnswersLog] = useState<Record<number, number>>({}); // question index -> option chosen
  const [timeLeft, setTimeLeft] = useState(45);
  const [quizFinished, setQuizFinished] = useState(false);

  // Filter and load quiz
  const handleStartQuiz = (category: 'Quantitative' | 'Logical' | 'Verbal') => {
    const subset = aptitudeQuestions.filter(q => q.category === category);
    setActiveQuestions(subset);
    setSelectedCategory(category);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswersLog({});
    setTimeLeft(45);
    setQuizFinished(false);
  };

  // Timer effect
  useEffect(() => {
    if (!selectedCategory || quizFinished) return;
    if (timeLeft <= 0) {
      // Auto advance or submit current
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedCategory, quizFinished]);

  const handleNextQuestion = () => {
    // Record current choice (fallback to -1 if skipped)
    setAnswersLog(prev => ({
      ...prev,
      [currentIndex]: selectedOption !== null ? selectedOption : -1
    }));

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimeLeft(45);
    } else {
      setQuizFinished(true);
      
      // Calculate final score and award XP
      const subset = activeQuestions;
      let correct = 0;
      subset.forEach((q, idx) => {
        const chosen = selectedOption !== null && idx === currentIndex ? selectedOption : answersLog[idx];
        if (chosen === q.correctIndex) correct++;
      });

      const bonusXp = correct * 100;
      setUserStats(prev => ({
        ...prev,
        xp: prev.xp + bonusXp,
        completedToday: Math.min(prev.dailyGoal, prev.completedToday + 1)
      }));
    }
  };

  const getCorrectAnswersCount = () => {
    let count = 0;
    activeQuestions.forEach((q, idx) => {
      if (answersLog[idx] === q.correctIndex) count++;
    });
    return count;
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      {!selectedCategory ? (
        // ==========================================
        // CATEGORY CARD SELECTOR
        // ==========================================
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Timed Aptitude Challenges</h2>
            <p className="text-xs text-slate-500">Solve speed drills covering Quantitative formulas, logical blood relations, and verbal vocab keys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quantitative Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-indigo-600/5 border border-blue-500/20 flex flex-col justify-between h-64 group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all" />
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/20 rounded-2xl w-fit">
                  <BrainCircuit className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Quantitative Aptitude</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Time & Work, Trains, Compound Interest, and algebra speed formulas.</p>
              </div>
              <button 
                onClick={() => handleStartQuiz('Quantitative')}
                className="flex items-center gap-1 bg-slate-950 hover:bg-blue-600 text-xs font-bold text-slate-200 hover:text-white px-4 py-2.5 rounded-xl border border-slate-905 transition-all w-full justify-center cursor-pointer"
              >
                Start Quant Quiz
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Logical Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/5 border border-indigo-500/20 flex flex-col justify-between h-64 group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all" />
              <div className="space-y-3">
                <div className="p-3 bg-indigo-500/20 rounded-2xl w-fit">
                  <Clock className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Logical Reasoning</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Blood relations, coding-decoding, logical syllogisms, and sequence grids.</p>
              </div>
              <button 
                onClick={() => handleStartQuiz('Logical')}
                className="flex items-center gap-1 bg-slate-950 hover:bg-indigo-600 text-xs font-bold text-slate-200 hover:text-white px-4 py-2.5 rounded-xl border border-slate-905 transition-all w-full justify-center cursor-pointer"
              >
                Start Logical Quiz
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Verbal Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-500/10 to-teal-600/5 border border-emerald-500/20 flex flex-col justify-between h-64 group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all" />
              <div className="space-y-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl w-fit">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Verbal Aptitude</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Vocabulary antonyms, sentence completion, and logical comprehension blocks.</p>
              </div>
              <button 
                onClick={() => handleStartQuiz('Verbal')}
                className="flex items-center gap-1 bg-slate-950 hover:bg-emerald-600 text-xs font-bold text-slate-200 hover:text-white px-4 py-2.5 rounded-xl border border-slate-905 transition-all w-full justify-center cursor-pointer"
              >
                Start Verbal Quiz
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      ) : quizFinished ? (
        // ==========================================
        // QUIZ RESULT REPORT & STEP SOLUTIONS
        // ==========================================
        <div className="space-y-6 max-w-3xl mx-auto">
          
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 text-center space-y-4">
            <div className="p-3.5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 w-fit mx-auto">
              <Award className="w-8 h-8 text-indigo-400" />
            </div>
            
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest">Aptitude Scorecard</span>
              <h3 className="text-2xl font-black text-white mt-1">{selectedCategory} Quiz Completed!</h3>
              <p className="text-xs text-slate-400 mt-1">You solved {getCorrectAnswersCount()} of {activeQuestions.length} questions correctly.</p>
            </div>

            <div className="flex justify-center gap-6 py-2 border-y border-slate-900 max-w-md mx-auto text-xs">
              <div>
                <span className="text-slate-500 block">XP Awarded</span>
                <span className="text-lg font-bold text-emerald-400">+{getCorrectAnswersCount() * 100} XP</span>
              </div>
              <div className="w-px bg-slate-900" />
              <div>
                <span className="text-slate-500 block">Completion Bonus</span>
                <span className="text-lg font-bold text-indigo-400">+50 XP</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Select Another Section
            </button>
          </div>

          {/* Mathematical Step-by-Step Solutions */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Step-by-Step Explanations
            </h4>

            {activeQuestions.map((q, idx) => {
              const chosen = answersLog[idx];
              const isCorrect = chosen === q.correctIndex;
              return (
                <div key={q.id} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900 space-y-4 text-xs">
                  <div className="flex justify-between items-start gap-4">
                    <h5 className="font-bold text-white text-sm">Question {idx + 1}: {q.question}</h5>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase shrink-0 ${
                      isCorrect ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' : 'bg-rose-950/40 text-rose-400 border border-rose-900/30'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect / Skipped'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-400 font-medium">
                    {q.options.map((opt, oIdx) => (
                      <div 
                        key={oIdx} 
                        className={`p-2.5 rounded-lg border ${
                          oIdx === q.correctIndex ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-300' :
                          oIdx === chosen ? 'bg-rose-950/30 border-rose-900/40 text-rose-300' :
                          'bg-slate-950 border-slate-900'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        // ==========================================
        // ACTIVE TIMED QUIZ RUNNING CONSOLE
        // ==========================================
        <div className="space-y-6 max-w-2xl mx-auto">
          
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-6">
            
            {/* Countdown header */}
            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest">{selectedCategory} Quiz</span>
                <h3 className="text-sm font-bold text-white mt-0.5">Question {currentIndex + 1} of {activeQuestions.length}</h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-900/30 animate-pulse">
                <Clock className="w-3.5 h-3.5 fill-amber-400" />
                <span>{timeLeft}s remaining</span>
              </div>
            </div>

            {/* Step indicator bar */}
            <div className="flex gap-1">
              {activeQuestions.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full flex-1 transition-all ${
                    i === currentIndex ? 'bg-indigo-500' :
                    i < currentIndex ? 'bg-indigo-950' : 'bg-slate-850'
                  }`}
                />
              ))}
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <p className="text-base font-bold text-white leading-relaxed font-sans">
                {activeQuestions[currentIndex]?.question}
              </p>

              {/* Option Radio Cards */}
              <div className="grid gap-3">
                {activeQuestions[currentIndex]?.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-xs font-semibold flex items-center justify-between ${
                        isSelected 
                          ? 'bg-indigo-950/30 border-indigo-600 text-white' 
                          : 'bg-slate-950 border-slate-900 text-slate-350 hover:bg-slate-900/50 hover:text-white'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-indigo-500 bg-indigo-600' : 'border-slate-800'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Advance control footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-850 text-xs">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-slate-500 hover:text-white font-bold"
              >
                Abort Quiz
              </button>

              <button 
                onClick={handleNextQuestion}
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {currentIndex < activeQuestions.length - 1 ? 'Lock & Next' : 'Lock & Finish'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
