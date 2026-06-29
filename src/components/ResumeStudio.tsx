/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Award,
  ChevronDown,
  RefreshCw,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { ResumeData } from '../types';

export default function ResumeStudio() {
  const [resume, setResume] = useState<ResumeData>({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
    website: 'https://janedoe.dev',
    github: 'https://github.com/janedoe',
    linkedin: 'https://linkedin.com/in/janedoe',
    education: [
      { institution: 'State University', degree: 'B.S. in Computer Science', period: '2023 - 2027', grade: 'GPA: 3.9/4.0' }
    ],
    experience: [
      { company: 'Acme Software', role: 'Software Engineering Intern', period: 'Summer 2025', description: 'Worked on front-end features in React and TypeScript. Improved load performance of internal portals.' }
    ],
    projects: [
      { name: 'PrepVerse Placement Portal', tech: 'React, Express, Google Gemini', description: 'Collaborative preparation app with automated simulated grading and structured sheets.', link: 'https://github.com/janedoe/prepverse' }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'SQL', 'Algorithms', 'System Design']
  });

  const [activeTemplate, setActiveTemplate] = useState<'minimal' | 'executive'>('minimal');
  
  // AI Bullet Point Optimizer states
  const [bulletToOptimize, setBulletToOptimize] = useState('Helped optimize load times for the company dashboard.');
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Skills input helper
  const [newSkill, setNewSkill] = useState('');

  // ATS Calculations
  const [score, setScore] = useState(0);
  const [checklist, setChecklist] = useState<{ label: string; passed: boolean }[]>([]);

  useEffect(() => {
    // Dynamically calculate ATS compliance score & build checklist
    const checks = [
      { label: 'Has GitHub profile linked', passed: !!resume.github },
      { label: 'Has LinkedIn profile linked', passed: !!resume.linkedin },
      { label: 'Has Phone and Email listed', passed: !!resume.phone && !!resume.email },
      { label: 'At least 5 core technical skills', passed: resume.skills.length >= 5 },
      { label: 'At least 1 detailed project', passed: resume.projects.length >= 1 },
      { label: 'Professional work experience listed', passed: resume.experience.length >= 1 },
      { label: 'Education details listed', passed: resume.education.length >= 1 },
    ];

    const passedCount = checks.filter(c => c.passed).length;
    const computedScore = Math.round((passedCount / checks.length) * 100);

    setScore(computedScore);
    setChecklist(checks);
  }, [resume]);

  // Form management helpers
  const handleAddEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', period: '', grade: '' }]
    }));
  };

  const handleRemoveEducation = (idx: number) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
  };

  const handleAddExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', period: '', description: '' }]
    }));
  };

  const handleRemoveExperience = (idx: number) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
  };

  const handleAddProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', tech: '', description: '', link: '' }]
    }));
  };

  const handleRemoveProject = (idx: number) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!resume.skills.includes(newSkill.trim())) {
      setResume(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  // AI Bullet optimization call to Gemini server
  const handleOptimizeBullet = async () => {
    if (!bulletToOptimize.trim()) return;
    setIsAiLoading(true);
    setAiError('');
    setAiSuggestions('');

    try {
      const response = await fetch('/api/gemini/resume-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bulletPoint: bulletToOptimize,
          role: 'Software Engineer',
          techKeywords: resume.skills.join(', ')
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAiSuggestions(data.feedback);
      } else {
        setAiError(data.error || 'Failed to analyze resume point. Please check server logs.');
      }
    } catch (err) {
      console.error(err);
      setAiError('Failed to communicate with our Gemini Coach backend proxy.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto print:p-0 print:bg-white print:text-black">
      
      {/* HEADER CONTROLS (Hidden when printing) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Interactive ATS Resume Studio</h2>
          <p className="text-xs text-slate-500">Construct an industry-compliant resume, view the scorecard, and refine bullets with Gemini.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTemplate('minimal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTemplate === 'minimal' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Minimal SDE
            </button>
            <button
              onClick={() => setActiveTemplate('executive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTemplate === 'executive' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Executive
            </button>
          </div>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / PDF Export
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE GRID (Hidden when printing except the actual preview container) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        
        {/* LEFT COLUMN: EDITABLE CONSTRUCTOR & ATS RATING (7 COLS - Hidden when printing) */}
        <div className="lg:col-span-7 space-y-6 print:hidden">
          
          {/* ATS Score & Checklist Panel */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-slate-850 pb-4 md:pb-0">
              <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">ATS Score</span>
              <p className="text-5xl font-black text-indigo-400 tracking-tight my-1">{score}%</p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Target: 80%+ Score</span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-2">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Compliance Checklist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {item.passed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <span className={item.passed ? 'text-slate-300' : 'text-slate-500'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form: Personal Info */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2">1. Contact & Social Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={resume.fullName}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={resume.email}
                  onChange={(e) => setResume({ ...resume, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Phone</label>
                <input 
                  type="text" 
                  value={resume.phone}
                  onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Personal Portfolio URL</label>
                <input 
                  type="text" 
                  value={resume.website}
                  onChange={(e) => setResume({ ...resume, website: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">GitHub profile URL</label>
                <input 
                  type="text" 
                  value={resume.github}
                  onChange={(e) => setResume({ ...resume, github: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">LinkedIn profile URL</label>
                <input 
                  type="text" 
                  value={resume.linkedin}
                  onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Form: Skills Tags */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2">2. Skills Catalog</h3>
            
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add skill (e.g. Docker, GraphQL, Redis...)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Add Tag
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {resume.skills.map(skill => (
                <span 
                  key={skill} 
                  className="flex items-center gap-1.5 text-xs bg-slate-950 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-800"
                >
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-600 hover:text-rose-400 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Form: Experience Blocks */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">3. Work Experience</h3>
              <button 
                onClick={handleAddExperience}
                className="flex items-center gap-1 bg-indigo-950/40 hover:bg-indigo-950/80 text-[10px] font-extrabold text-indigo-400 border border-indigo-850 px-2.5 py-1 rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Experience
              </button>
            </div>

            {resume.experience.map((exp, idx) => (
              <div key={idx} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900 space-y-3 relative group">
                <button 
                  onClick={() => handleRemoveExperience(idx)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Company</label>
                    <input 
                      type="text" 
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[idx].company = e.target.value;
                        setResume({ ...resume, experience: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Role / Title</label>
                    <input 
                      type="text" 
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[idx].role = e.target.value;
                        setResume({ ...resume, experience: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Period</label>
                    <input 
                      type="text" 
                      value={exp.period}
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[idx].period = e.target.value;
                        setResume({ ...resume, experience: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Description / Achievements</label>
                  <textarea 
                    rows={2}
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...resume.experience];
                      updated[idx].description = e.target.value;
                      setResume({ ...resume, experience: updated });
                    }}
                    className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Form: Projects */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">4. Academic Projects</h3>
              <button 
                onClick={handleAddProject}
                className="flex items-center gap-1 bg-indigo-950/40 hover:bg-indigo-950/80 text-[10px] font-extrabold text-indigo-400 border border-indigo-850 px-2.5 py-1 rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            {resume.projects.map((proj, idx) => (
              <div key={idx} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900 space-y-3 relative group">
                <button 
                  onClick={() => handleRemoveProject(idx)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Project Name</label>
                    <input 
                      type="text" 
                      value={proj.name}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[idx].name = e.target.value;
                        setResume({ ...resume, projects: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Tech Stack</label>
                    <input 
                      type="text" 
                      value={proj.tech}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[idx].tech = e.target.value;
                        setResume({ ...resume, projects: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Project Link</label>
                    <input 
                      type="text" 
                      value={proj.link}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[idx].link = e.target.value;
                        setResume({ ...resume, projects: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Description</label>
                  <textarea 
                    rows={2}
                    value={proj.description}
                    onChange={(e) => {
                      const updated = [...resume.projects];
                      updated[idx].description = e.target.value;
                      setResume({ ...resume, projects: updated });
                    }}
                    className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Form: Education */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">5. Education</h3>
              <button 
                onClick={handleAddEducation}
                className="flex items-center gap-1 bg-indigo-950/40 hover:bg-indigo-950/80 text-[10px] font-extrabold text-indigo-400 border border-indigo-850 px-2.5 py-1 rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Education
              </button>
            </div>

            {resume.education.map((edu, idx) => (
              <div key={idx} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900 space-y-3 relative group">
                <button 
                  onClick={() => handleRemoveEducation(idx)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Institution</label>
                    <input 
                      type="text" 
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...resume.education];
                        updated[idx].institution = e.target.value;
                        setResume({ ...resume, education: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Degree</label>
                    <input 
                      type="text" 
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...resume.education];
                        updated[idx].degree = e.target.value;
                        setResume({ ...resume, education: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Period</label>
                    <input 
                      type="text" 
                      value={edu.period}
                      onChange={(e) => {
                        const updated = [...resume.education];
                        updated[idx].period = e.target.value;
                        setResume({ ...resume, education: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">GPA / Grade</label>
                    <input 
                      type="text" 
                      value={edu.grade}
                      onChange={(e) => {
                        const updated = [...resume.education];
                        updated[idx].grade = e.target.value;
                        setResume({ ...resume, education: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Bullet Point Optimizer Box */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-indigo-500/20 space-y-4">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Gemini AI Bullet Optimizer
            </h3>
            <p className="text-xs text-slate-400">Paste a project or experience bullet. Our AI Coach will optimize it following the Google SDE XYZ metrics formula.</p>
            
            <div className="space-y-3">
              <textarea 
                rows={2}
                placeholder="e.g. Added a cache which made queries faster."
                value={bulletToOptimize}
                onChange={(e) => setBulletToOptimize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500"
              />
              <button 
                onClick={handleOptimizeBullet}
                disabled={isAiLoading || !bulletToOptimize.trim()}
                className="flex items-center justify-center gap-1.5 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {isAiLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Analyzing with Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Optimize with Gemini AI
                  </>
                )}
              </button>
            </div>

            {aiError && (
              <div className="p-3 bg-rose-950/40 border border-rose-900/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {aiSuggestions && (
              <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-850 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {aiSuggestions}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: RENDERED CANVAS RESUME (5 COLS - Printable) */}
        <div className="lg:col-span-5 bg-white text-black p-8 rounded-3xl min-h-[840px] shadow-2xl relative border border-slate-200 print:border-none print:shadow-none print:rounded-none font-sans overflow-hidden">
          
          <div className="space-y-6">
            {/* Header: Full Name & Social Icons */}
            <div className="text-center space-y-1.5 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">{resume.fullName || 'YOUR FULL NAME'}</h2>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-650 font-semibold">
                {resume.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {resume.email}
                  </span>
                )}
                {resume.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {resume.phone}
                  </span>
                )}
                {resume.website && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {resume.website}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center gap-3 text-[9px] text-indigo-600 font-bold mt-1">
                {resume.github && (
                  <span className="flex items-center gap-1">
                    <Github className="w-3 h-3 text-indigo-500" />
                    GitHub
                  </span>
                )}
                {resume.linkedin && (
                  <span className="flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-indigo-500" />
                    LinkedIn
                  </span>
                )}
              </div>
            </div>

            {/* Section: Education */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-widest border-b border-slate-100 pb-1">Education</h3>
              <div className="space-y-3">
                {resume.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs">
                    <div>
                      <h4 className="font-bold text-slate-850">{edu.institution || 'University Name'}</h4>
                      <p className="text-slate-650 italic text-[11px]">{edu.degree || 'Degree & major'}</p>
                    </div>
                    <div className="text-right text-[10px] text-slate-600">
                      <p className="font-bold">{edu.period || 'Year bounds'}</p>
                      <p className="font-semibold text-slate-500">{edu.grade || 'Grades'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Experience */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-widest border-b border-slate-100 pb-1">Professional Experience</h3>
              <div className="space-y-4">
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-850">{exp.company || 'Company'}</h4>
                        <p className="text-slate-600 font-semibold italic text-[11px]">{exp.role || 'Job Title'}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">{exp.period || 'Summer 2026'}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-relaxed font-sans whitespace-pre-wrap">{exp.description || 'Task bullet points...'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Projects */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-widest border-b border-slate-100 pb-1">Projects</h3>
              <div className="space-y-4">
                {resume.projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-850">{proj.name || 'Project Title'}</h4>
                      <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">{proj.tech || 'React'}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-relaxed">{proj.description || 'Description of achievements...'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-widest border-b border-slate-100 pb-1">Technical Skills</h3>
              <p className="text-[11px] text-slate-750 font-medium font-sans leading-relaxed">
                {resume.skills.join(', ') || 'No skills added yet.'}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
