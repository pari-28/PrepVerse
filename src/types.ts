/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DsaProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companyTags: string[];
  sheets: ('Blind 75' | 'NeetCode 150' | 'Striver Sheet')[];
  description: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  editorial: string;
  videoUrl: string;
  codeTemplate: string;
}

export interface UserStats {
  name: string;
  xp: number;
  streak: number;
  solvedCount: number;
  targetCompany: string;
  dailyGoal: number;
  completedToday: number;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    grade: string;
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  projects: {
    name: string;
    tech: string;
    description: string;
    link: string;
  }[];
  skills: string[];
}

export interface AptitudeQuestion {
  id: string;
  category: 'Quantitative' | 'Logical' | 'Verbal';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  avatar?: string;
  category: 'Experiences' | 'Resources' | 'Q&A' | 'General' | string;
  content: string;
  likes?: number;
  upvotes: number;
  commentsCount?: number;
  repliesCount: number;
  createdAt?: string;
  timestamp: string;
  tags: string[];
  role?: string;
}

export interface Contributor {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  badges: string[];
  solved: number;
  role: string;
}
