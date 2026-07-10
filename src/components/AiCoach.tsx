/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useRef, useEffect, ActionDispatch } from 'react';
import { 
  Sparkles, 
  Send, 
  Brain, 
  HelpCircle, 
  Code, 
  Compass, 
  User, 
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { AICoachSkeleton } from "./SkeletonLoaders";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiCoach() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your PrepVerse SDE Placement Coach. I can help you build custom placement roadmaps, review your projects, drill system design diagrams, or walk through tough algorithms. What is on your mind today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AICoachSkeleton />;

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    if (!customText) {
      setInputText('');
    }
    setErrorMessage('');

    const updatedMessages = [...messages, { role: 'user', content: textToSend } as Message];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: textToSend
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setErrorMessage(data.error || 'Failed to analyze request. Check console logs.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to connect with our Gemini AI Coach backend proxy.');
    } finally {
      setIsLoading(false);
    }
  };

  const prompts = [
    { label: 'Generate placement roadmap', text: 'Generate a step-by-step 3-month preparation roadmap for an SDE placement at Google. Break it down into weekly milestones spanning DSA, System Design, and CS Fundamentals.' },
    { label: 'Drill System Design concepts', text: 'Explain how an LRU Cache is implemented. Include details on the double-linked-list & hash-map layout, and time/space complexities.' },
    { label: 'Behavioral STAR simulation', text: 'Ask me a difficult Amazon Leadership Principle behavioral question (like "Tell me about a time you took a risk") and evaluate my response based on the STAR framework.' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col justify-between">
      
      {/* Title */}
      <div className="shrink-0">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          PrepVerse Placement AI Coach
        </h2>
        <p className="text-xs text-slate-500">Ask career questions, design architectures, or outline mock algorithms with server-side Gemini intelligence.</p>
      </div>

      {/* Chat Messages Panel */}
      <div className="flex-1 min-h-[300px] border border-slate-900 bg-slate-950 rounded-3xl p-6 overflow-y-auto space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            
            {msg.role === 'assistant' && (
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-2xl h-fit border border-indigo-500/20">
                <Brain className="w-5 h-5" />
              </div>
            )}

            <div className={`p-4 rounded-2xl max-w-[75%] text-sm leading-relaxed whitespace-pre-wrap font-sans ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-slate-900/40 text-slate-200 border border-slate-900 rounded-tl-none'
            }`}>
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="p-2.5 bg-slate-900 text-slate-400 rounded-2xl h-fit border border-slate-800">
                <User className="w-5 h-5" />
              </div>
            )}

          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-2xl h-fit border border-indigo-500/20 animate-pulse">
              <Brain className="w-5 h-5" />
            </div>
            <div className="p-4 bg-slate-900/40 text-slate-450 border border-slate-900 rounded-2xl rounded-tl-none flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Coach is constructing a response...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-rose-950/40 border border-rose-900/30 text-rose-400 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested Templates Prompts (Curated SDE template keys) */}
      {messages.length === 1 && (
        <div className="space-y-2 shrink-0 pt-2">
          <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest px-1">Curated Prompts Templates</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                className="flex items-center justify-between p-3.5 bg-slate-900 hover:bg-slate-850 rounded-2xl border border-slate-800 text-left text-xs text-slate-300 font-semibold transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="line-clamp-1">{p.label}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-650 group-hover:text-white transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input Box */}
      <div className="flex gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-900 shrink-0 mt-4">
        <input
          type="text"
          placeholder="Ask your coach anything about DSA, resumes, or interview questions..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 focus:outline-none placeholder:text-slate-600"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputText.trim()}
          className="p-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </div>

    </div>
  );
}
