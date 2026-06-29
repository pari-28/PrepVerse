export interface CompanyPrepInfo {
  id: string;
  name: string;
  logo: string;
  eligibility: string[];
  hiringProcess: string[];
  oaPattern: {
    duration: string;
    sections: { name: string; questions: string; description: string }[];
  };
  rounds: { name: string; focus: string; duration: string; tips: string[] }[];
  resources: { title: string; link: string; type: 'Video' | 'Article' | 'Doc' }[];
  faqs: { q: string; a: string }[];
}

export const companyPreps: CompanyPrepInfo[] = [
  {
    id: 'google',
    name: 'Google',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&q=80',
    eligibility: [
      'B.Tech/B.E/M.Tech/M.S in Computer Science or related quantitative field.',
      'Minimum CGPA: 7.5 or above (usually no active backlogs).',
      'Strong proficiency in data structures, algorithms, and system design.'
    ],
    hiringProcess: [
      'Online Assessment / Coding Challenge (1-2 Coding questions)',
      'Technical Screening Round (45 minutes, algorithmic problem solving)',
      '3-4 Virtual Onsite Technical Rounds (Algorithmic problem solving + Googlyness/Behavioral)'
    ],
    oaPattern: {
      duration: '90 Minutes',
      sections: [
        { name: 'Coding Question 1', questions: '1 Medium/Hard DSA', description: 'Focuses on graphs, trees, dynamic programming or complex arrays.' },
        { name: 'Coding Question 2', questions: '1 Medium/Hard DSA', description: 'Advanced graph traversal, math models, or optimized prefix trees.' }
      ]
    },
    rounds: [
      {
        name: 'Technical Round 1-3 (Coding)',
        focus: 'Data Structures, Graph Traversals, Dynamic Programming, Time/Space optimization',
        duration: '45 mins each',
        tips: [
          'Think out loud. Google interviewers evaluate your thought process heavily.',
          'Start with a brute force answer, state its time/space complexity, and explain how you will optimize it.',
          'Write clean, modular code with descriptive variable names.',
          'Dry run your solution with a few edge cases (e.g. empty lists, negative inputs).'
        ]
      },
      {
        name: 'Googlyness & Leadership',
        focus: 'Cultural fit, team collaboration, conflict resolution, ambiguous situations',
        duration: '45 mins',
        tips: [
          'Use the STAR method (Situation, Task, Action, Result) to format your answers.',
          'Focus on collaborative success rather than solo accomplishments.',
          'Show ownership, resilience, and an open-minded attitude to diverse ideas.'
        ]
      }
    ],
    resources: [
      { title: 'Google Tech Dev Guide', link: 'https://techdevguide.withgoogle.com/', type: 'Doc' },
      { title: 'How to Solve Algorithmic Problems at Google', link: 'https://www.youtube.com/watch?v=XKu_SEDAykw', type: 'Video' },
      { title: 'Google Interview Warmup', link: 'https://grow.google/certificates/interview-warmup/', type: 'Doc' }
    ],
    faqs: [
      { q: 'Is a resume matching score of 80%+ mandatory for Google?', a: 'While a high ATS score helps you clear initial resume screens, Google recruiters look for exceptional projects, competitive programming profiles, and strong GPA credentials.' },
      { q: 'Does Google allow pseudocode in coding interviews?', a: 'No, you are expected to write syntactically correct, compiling, and well-designed code in your language of choice (C++, Java, Python, or Go).' }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1625014020903-e329f586c990?w=100&h=100&fit=crop&q=80',
    eligibility: [
      'B.Tech / M.Tech / MCA in CS, IT, or ECE branch.',
      'Minimum CGPA: 7.0 or above.',
      'Deep understanding of OOPs, DBMS, Operating Systems, and DSA.'
    ],
    hiringProcess: [
      'Codility Online Assessment (3 Coding Questions)',
      '1 Technical Screening (Often includes project deep dive + DSA)',
      '3-4 Onsite Rounds (System Design, DSA, and Managerial Behavioral)'
    ],
    oaPattern: {
      duration: '110 Minutes',
      sections: [
        { name: 'Coding Assessment', questions: '3 Medium-level DSA', description: 'Questions focus on string manipulation, sliding windows, heaps, or trees.' }
      ]
    },
    rounds: [
      {
        name: 'Technical & System Design',
        focus: 'Class diagramming, database schemas, API architecture, high-availability concepts',
        duration: '60 mins',
        tips: [
          'Be ready to explain low-level class design (OOP) for simple apps (e.g., parking lot, elevator).',
          'Explain database normalizations, SQL vs NoSQL, and indexing mechanics.'
        ]
      },
      {
        name: 'Managerial Round',
        focus: 'Motivation, alignment with Microsoft culture, learning agile skills',
        duration: '45 mins',
        tips: [
          'Show genuine interest in Microsoft products (Azure, VS Code, Windows ecosystem).',
          'Discuss past experiences where you learned a brand new framework on a tight deadline.'
        ]
      }
    ],
    resources: [
      { title: 'Microsoft Technical Careers Guide', link: 'https://careers.microsoft.com/', type: 'Doc' },
      { title: 'System Design Primer', link: 'https://github.com/donnemartin/system-design-primer', type: 'Doc' }
    ],
    faqs: [
      { q: 'Does Microsoft ask system design questions from freshers?', a: 'Yes, but mostly Low-Level Design (LLD) focusing on object-oriented programming, class design patterns, or simple multi-threaded constructs.' }
    ]
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: 'https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=100&h=100&fit=crop&q=80',
    eligibility: [
      'BS, MS, or PhD in Computer Science or related field.',
      'Proven expertise in high-performance coding and algorithmic optimization.'
    ],
    hiringProcess: [
      'Coding screening interview (2 DSA questions in 45 minutes)',
      'Onsite Loop: 2 Coding rounds, 1 System Design / Product Design, 1 Behavioral'
    ],
    oaPattern: {
      duration: '70 Minutes',
      sections: [
        { name: 'Coding Rounds', questions: '4 Medium DSA Questions', description: 'Meta heavily relies on standard LeetCode patterns (sliding window, binary tree BFS/DFS, binary search).' }
      ]
    },
    rounds: [
      {
        name: 'Meta Speed Coding Round',
        focus: 'Solving 2 medium-level questions quickly and perfectly in 45 minutes.',
        duration: '45 mins',
        tips: [
          'Speed is critical. You must aim to complete the first solution in 15 minutes and the second in 20 minutes.',
          'Ensure your code is 100% bug-free and optimized.'
        ]
      }
    ],
    resources: [
      { title: 'Meta Careers Prep', link: 'https://www.metacareers.com/swe-prep', type: 'Doc' }
    ],
    faqs: [
      { q: 'Are Meta questions sourced from LeetCode patterns?', a: 'Many Meta questions assess variations of classic patterns. Speed of writing compilable code is highly valued.' }
    ]
  }
];
