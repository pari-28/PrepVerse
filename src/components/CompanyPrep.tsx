/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  FileText, 
  Video, 
  HelpCircle,
  Award,
  ShieldCheck,
  Bookmark
} from 'lucide-react';
import { companyPreps } from '../data/companyData';
import { CompanyPrepInfo } from '../data/companyData';

export default function CompanyPrep() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyPrepInfo | null>(null);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      {!selectedCompany ? (
        // ==========================================
        // GRID VIEW OF COMPANIES
        // ==========================================
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Company Placement Guides</h2>
            <p className="text-xs text-slate-500">Deep dives into recruitment pipelines, online assessment criteria, and specific interview loops.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyPreps.map((company) => (
              <div 
                key={company.id}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl group-hover:scale-125 transition-all" />
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-12 h-12 rounded-2xl border border-slate-800 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{company.name}</h3>
                      <p className="text-xs text-slate-500">Product Engineering</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-medium">OA Pattern: <span className="font-bold text-slate-300">{company.oaPattern.duration}</span></p>
                    <p className="text-xs text-slate-450 leading-relaxed truncate">{company.eligibility[0]}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] bg-slate-950 text-slate-400 border border-slate-900 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {company.rounds.length} Interview Rounds
                  </span>
                  
                  <button 
                    onClick={() => setSelectedCompany(company)}
                    className="flex items-center gap-1 bg-slate-950 hover:bg-blue-600 text-xs font-bold text-slate-200 hover:text-white px-3.5 py-2 rounded-xl border border-slate-900 hover:border-blue-500 transition-all cursor-pointer"
                  >
                    View Guide
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // ==========================================
        // DETAILED COMPANY GUIDE VIEW
        // ==========================================
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <button 
              onClick={() => setSelectedCompany(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              All Guides
            </button>
            <span className="text-xs bg-indigo-950/40 text-indigo-400 font-extrabold px-3 py-1 rounded-full border border-indigo-900/30">
              Verified Pipeline 2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 Cols: Rounds, Pipeline */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Company Intro Header */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src={selectedCompany.logo} 
                  alt={selectedCompany.name} 
                  className="w-16 h-16 rounded-2xl border border-slate-800 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-2xl font-black text-white tracking-tight">{selectedCompany.name} SDE Placement Guide</h3>
                  <p className="text-xs text-slate-400">Curated from verified candidate interview loop logs and recruitment timelines.</p>
                </div>
              </div>

              {/* Recruitment Pipeline Process */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-blue-400" />
                  Hiring Pipeline Overview
                </h3>
                
                <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-6 pt-2">
                  {selectedCompany.hiringProcess.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-10 top-0.5 bg-blue-600/15 border border-blue-500/30 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-blue-400">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-200 font-semibold">{step.split('(')[0].trim()}</p>
                      {step.includes('(') && (
                        <p className="text-xs text-slate-500 mt-0.5 italic">{step.substring(step.indexOf('(') + 1, step.indexOf(')'))}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Rounds In-Depth */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-indigo-400" />
                  Technical & Googlyness Round Focus
                </h3>

                <div className="space-y-4">
                  {selectedCompany.rounds.map((round, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-white">{round.name}</h4>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">Focus: {round.focus}</p>
                        </div>
                        <span className="text-[10px] bg-indigo-950 text-indigo-400 font-bold px-2 py-0.5 rounded border border-indigo-900/30">
                          {round.duration}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Preparation Tips</p>
                        <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                          {round.tips.map((tip, tIdx) => (
                            <li key={tIdx} className="leading-relaxed">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Eligibility, OA format, resources */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Eligibility Box */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Academic Eligibility</h3>
                <ul className="space-y-2.5">
                  {selectedCompany.eligibility.map((el, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* OA Pattern details */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Online Assessment (OA)</h3>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-400">Duration Limit:</span>
                    <span className="text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {selectedCompany.oaPattern.duration}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {selectedCompany.oaPattern.sections.map((sect, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 space-y-1 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-indigo-400">{sect.name}</span>
                        <span className="text-slate-500">{sect.questions}</span>
                      </div>
                      <p className="text-[10px] text-slate-550 leading-relaxed">{sect.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prep Resources links */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Official Resources</h3>
                <div className="grid gap-2">
                  {selectedCompany.resources.map((res, idx) => (
                    <a 
                      key={idx}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-900 text-xs text-slate-300 font-semibold transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        {res.type === 'Video' ? <Video className="w-4 h-4 text-rose-500" /> : <FileText className="w-4 h-4 text-blue-400" />}
                        <span>{res.title}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-650 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* FAQS for Company */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-amber-400" />
              Frequently Asked Questions (FAQs)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCompany.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-900 space-y-2 text-xs leading-normal">
                  <p className="font-bold text-white">Q: {faq.q}</p>
                  <p className="text-slate-400 leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
