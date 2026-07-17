/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserStats } from './types';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import DsaModule from './components/DsaModule';
import ResumeStudio from './components/ResumeStudio';
import InterviewHub from './components/InterviewHub';
import CompanyPrep from './components/CompanyPrep';
import Aptitude from './components/Aptitude';
import AiCoach from './components/AiCoach';
import Community from './components/Community';
import Profile from './components/Profile';
import Settings from './components/Settings';
import AdminDashboard from './components/AdminDashboard';
import OpenSourceMeta from './components/OpenSourceMeta';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    name: 'Jane Doe',
    xp: 1250,
    streak: 6,
    solvedCount: 3,
    dailyGoal: 3,
    completedToday: 1
  });

  useEffect(() => {
    const handleDeviceCheck = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    handleDeviceCheck();

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  const handleEnterApp = () => {
    setCurrentTab('dashboard');
  };

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <Dashboard 
            userStats={userStats} 
            setUserStats={setUserStats} 
            setCurrentTab={setCurrentTab} 
          />
        );
      case 'dsa':
        return (
          <DsaModule 
            userStats={userStats} 
            setUserStats={setUserStats} 
          />
        );
      case 'resume':
        return <ResumeStudio />;
      case 'interview':
        return (
          <InterviewHub 
            userStats={userStats} 
            setUserStats={setUserStats} 
          />
        );
      case 'company':
        return <CompanyPrep />;
      case 'aptitude':
        return (
          <Aptitude 
            userStats={userStats} 
            setUserStats={setUserStats} 
          />
        );
      case 'coach':
        return <AiCoach />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile userStats={userStats} />;
      case 'settings':
        return (
          <Settings 
            userStats={userStats} 
            setUserStats={setUserStats} 
          />
        );
      case 'admin':
        return <AdminDashboard />;
      case 'opensource':
        return <OpenSourceMeta />;
      default:
        return (
          <Dashboard 
            userStats={userStats} 
            setUserStats={setUserStats} 
            setCurrentTab={setCurrentTab} 
          />
        );
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark bg-slate-950 text-white' : 'bg-slate-950 text-white'}>
      {currentTab === 'landing' ? (
        <LandingPage 
          onEnterApp={handleEnterApp} 
          setCurrentTab={setCurrentTab} 
        />
      ) : (
        <Navigation 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          userStats={userStats} 
          theme={theme} 
          setTheme={setTheme}
        >
          <div className="animate-fade-in">
            {renderActiveTab()}
          </div>
        </Navigation>
      )}

      {!isMobile && (
        <div className={isHovered ? 'custom-cursor-hover' : ''}>
          <div 
            className="custom-cursor-dot" 
            style={{ left: `${position.x}px`, top: `${position.y}px` }} 
          />
          <div 
            className="custom-cursor-ring" 
            style={{ left: `${position.x}px`, top: `${position.y}px` }} 
          />
        </div>
      )}
    </div>
  );
}