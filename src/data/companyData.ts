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
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&q=80',
    eligibility: [
      'B.Tech / M.Tech / MCA in Computer Science, IT, or related fields.',
      'Minimum CGPA: 7.0 or above (varies by campus).',
      'Strong knowledge of Data Structures, Algorithms, Object-Oriented Design, and System Design.'
    ],
    hiringProcess: [
      'Online Assessment (OA - Coding and Work Style Assessment)',
      '1-2 Technical Phone Screens (DSA and Behavioral)',
      '4-5 Virtual Onsite Rounds (System Design, DSA, and Bar Raiser)'
    ],
    oaPattern: {
      duration: '90-120 Minutes',
      sections: [
        { name: 'Coding Assessment', questions: '2 Medium/Hard DSA', description: 'Focuses on arrays, strings, sliding window, graphs, and dynamic programming.' },
        { name: 'Work Style Assessment', questions: 'Multiple Choice', description: 'Behavioral questions assessing alignment with Amazon Leadership Principles.' }
      ]
    },
    rounds: [
      {
        name: 'Technical Round (Coding)',
        focus: 'Data Structures, Algorithms, Problem Solving',
        duration: '60 mins',
        tips: [
          'Be prepared to write code on a whiteboard or virtual document without syntax highlighting.',
          'Discuss trade-offs in your design (time vs. space complexity).',
          'Clarify requirements before jumping into the solution.'
        ]
      },
      {
        name: 'Bar Raiser Round',
        focus: 'Amazon Leadership Principles, deep behavioral dive, and raising the hiring bar',
        duration: '60 mins',
        tips: [
          'Frame your answers using the STAR method (Situation, Task, Action, Result).',
          'Demonstrate Customer Obsession, Ownership, and Deliver Results.',
          'The Bar Raiser is an objective third party; focus on data-driven answers and impact.'
        ]
      }
    ],
    resources: [
      { title: 'Amazon Interview Prep Guide', link: 'https://www.amazon.jobs/en/landing_pages/interviewing-at-amazon', type: 'Doc' },
      { title: 'Amazon Leadership Principles', link: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', type: 'Doc' }
    ],
    faqs: [
      { q: 'How important are the Amazon Leadership Principles?', a: 'They are critical. Almost every interviewer will evaluate you against at least two Leadership Principles. Prepare multiple distinct stories.' },
      { q: 'What is the Bar Raiser?', a: 'A trained interviewer outside of the hiring team who ensures that every new hire raises the performance bar for the company.' }
    ]
  },{

    id: "adobe",
  name: "Adobe",
  logo: "https://images.unsplash.com/photo-1649734926700-8dfb770ffaee?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  eligibility: [
    "B.Tech / M.Tech / MCA in Computer Science, IT, Electronics, or related fields.",
    "Typically 7.0+ CGPA (varies by campus).",
    "Strong understanding of Data Structures, Algorithms, OOP, DBMS, Operating Systems, and Computer Networks.",
    "Good communication and problem-solving skills."
  ],

  hiringProcess: [
    "Online Assessment",
    "Technical Interview Round 1",
    "Technical Interview Round 2",
    "Hiring Manager / Technical Discussion",
    "HR Discussion"
  ],

  oaPattern: {
    duration: "90 Minutes",
    sections: [
      {
        name: "Coding",
        questions: "2 DSA Problems",
        description:
          "Usually one medium and one medium-hard problem covering arrays, strings, trees, graphs, hashing, or dynamic programming."
      },
      {
        name: "MCQs",
        questions: "15-20 Questions",
        description:
          "Questions from OOP, DBMS, Operating Systems, Computer Networks, and basic aptitude."
      }
    ]
  },

  rounds: [
    {
      name: "Technical Interview 1",
      focus: "Coding, Data Structures, Algorithms",
      duration: "60 mins",
      tips: [
        "Explain your approach before writing code.",
        "Discuss time and space complexity.",
        "Practice trees, graphs, recursion, and dynamic programming.",
        "Consider edge cases before finalizing your solution."
      ]
    },
    {
      name: "Technical Interview 2",
      focus: "Low-Level Design, CS Fundamentals, Coding",
      duration: "60 mins",
      tips: [
        "Revise OOP concepts and design principles.",
        "Be comfortable with DBMS normalization and SQL.",
        "Review Operating Systems and Computer Networks basics.",
        "Expect follow-up optimizations after solving coding questions."
      ]
    },
    {
      name: "Hiring Manager Round",
      focus: "Project Discussion and Problem Solving",
      duration: "45-60 mins",
      tips: [
        "Know every project on your resume thoroughly.",
        "Explain design decisions with trade-offs.",
        "Be prepared to discuss scalability and performance.",
        "Communicate clearly while solving open-ended problems."
      ]
    },
    {
      name: "HR Discussion",
      focus: "Behavioral and Culture Fit",
      duration: "30 mins",
      tips: [
        "Be honest about your career goals.",
        "Prepare examples demonstrating teamwork.",
        "Show enthusiasm for Adobe's products and innovation.",
        "Maintain confidence and professionalism."
      ]
    }
  ],

  resources: [
    {
      title: "Adobe Careers",
      link: "https://careers.adobe.com",
      type: "Article"
    },
    {
      title: "Adobe Interview Experience - GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/adobe-interview-experience/",
      type: "Article"
    },
    {
      title: "Adobe Placement Preparation",
      link: "https://www.interviewbit.com/adobe-interview-questions/",
      type: "Article"
    }
  ],

  faqs: [
    {
      q: "Does Adobe ask System Design for freshers?",
      a: "For SDE-1 campus hiring, System Design is generally limited. The focus is primarily on coding, OOP, and CS fundamentals."
    },
    {
      q: "Which DSA topics are most important?",
      a: "Arrays, Strings, Trees, Graphs, Dynamic Programming, Hashing, and Binary Search are among the most frequently tested topics."
    },
    {
      q: "Are projects discussed during interviews?",
      a: "Yes. Interviewers often spend considerable time discussing your projects, implementation choices, and technical decisions."
    }
  ]
  }  
];
