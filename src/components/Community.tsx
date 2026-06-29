/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Award, 
  Plus, 
  Search, 
  ChevronRight,
  TrendingUp,
  Tag,
  UserCheck
} from 'lucide-react';
import { ForumPost } from '../types';

const initialForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: 'Meta SDE Intern OA (June 2026) Experience',
    author: 'Karan Malhotra',
    role: 'SDE Prep Candidate',
    category: 'Experiences',
    content: 'Had my Meta online assessment yesterday. It consisted of 4 coding questions in 70 minutes on Codesignal. \n- Q1: String manipulation, relatively easy map-based check.\n- Q2: Matrix manipulation (rotating and filtering subarrays).\n- Q3: Sliding window max-sum with conditions (required deque/monotonic stack style tracking to beat memory constraints).\n- Q4: Dynamic programming subsegment sum.\n\nTips: Speed is extremely crucial on Codesignal! Don\'t get stuck on Q3, write a brute force if you have to, then return to optimize.',
    upvotes: 42,
    repliesCount: 8,
    timestamp: '2 hours ago',
    tags: ['Meta', 'OA', 'Sliding Window', 'Codesignal']
  },
  {
    id: 'post-2',
    title: 'Striver SDE Sheet - Essential Tree Traversal Cheat-Sheet',
    author: 'Arsh Gupta',
    role: 'Top Contributor',
    category: 'Resources',
    content: 'Here is my curated summary for Tree DFS and BFS traversal patterns:\n1. Pre-order/Post-order iterative uses a single Stack data structure.\n2. In-order iterative uses a Stack and an active pointer.\n3. Morris traversal achieves O(1) space complexity by temporarily editing child links (threading) and reverting them on the second visit.\n\nStudy these before coding rounds, as interviewers frequently drill tree transformations!',
    upvotes: 85,
    repliesCount: 14,
    timestamp: 'Yesterday',
    tags: ['DSA', 'Striver Sheet', 'Binary Trees', 'Recursion']
  }
];

export default function Community() {
  const [posts, setPosts] = useState<ForumPost[]>(initialForumPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom post inputs
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Experiences');
  const [tags, setTags] = useState('');

  const leaderboard = [
    { rank: 1, name: 'Aarav Sharma', xp: 4850, solved: 142, badge: 'Grandmaster' },
    { rank: 2, name: 'Priya Patel', xp: 4200, solved: 118, badge: 'Master' },
    { rank: 3, name: 'Rohan Gupta', xp: 3950, solved: 105, badge: 'Expert' },
    { rank: 4, name: 'Ananya Iyer', xp: 3100, solved: 82, badge: 'Specialist' },
    { rank: 5, name: 'Kabir Mehta', xp: 2850, solved: 75, badge: 'Pupil' }
  ];

  const handleUpvote = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: 'Jane Doe',
      role: 'SDE Intern Candidate',
      title,
      content,
      category: category as any,
      upvotes: 0,
      repliesCount: 0,
      timestamp: 'Just now',
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setPosts(prev => [newPost, ...prev]);
    setTitle('');
    setContent('');
    setTags('');
    setShowForm(false);
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-y-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: DISCUSSIONS & SHARING FEED (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Collaborative Forum Feed</h2>
              <p className="text-xs text-slate-500">Read interview archives, study guides, and salary packages posted by peers.</p>
            </div>

            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-500/10 shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Write Article
            </button>
          </div>

          {/* New article Form */}
          {showForm && (
            <form onSubmit={handleAddPost} className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Create New Article Post</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Article Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g., My Experience Interning at Microsoft (Summer 2026)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Category Group</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Experiences">Experiences</option>
                    <option value="Resources">Resources</option>
                    <option value="Q&A">Q&A</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Article Content</label>
                <textarea 
                  rows={4}
                  placeholder="Share preparation sources, timeline, online test codes, technical rounds, and offer status details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Tag Keywords (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Meta, Arrays, SDE, OA"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 text-xs">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="text-slate-500 hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </form>
          )}

          {/* Search bar and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 bg-slate-900/30 p-4 rounded-2xl border border-slate-900">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search articles, author names, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-9 text-xs text-white placeholder:text-slate-650 focus:outline-none"
              />
            </div>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 text-xs font-bold">
              {['All', 'Experiences', 'Resources', 'Q&A'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCategory === cat ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4 hover:border-slate-800 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-xs text-indigo-400">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        {post.author}
                        <span className="text-[9px] bg-indigo-950 text-indigo-400 font-extrabold px-1.5 py-0.5 rounded border border-indigo-900/20 uppercase tracking-wider">
                          {post.category}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">{post.role} • {post.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight leading-relaxed">{post.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans whitespace-pre-wrap">{post.content}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="flex items-center gap-1 text-[9px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded-full border border-slate-900 font-semibold font-mono">
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-slate-900/50 text-xs">
                  <button 
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-400 font-bold transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.upvotes} Upvotes</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.repliesCount} Replies</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: XP LEADERBOARD (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-indigo-400" />
              SDE Placement Leaderboard
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">Secured XP ranks based on daily coding goals, mock scorecards, and forum articles published.</p>

            <div className="space-y-2 pt-2">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank}
                  className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-2xl border border-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center text-xs font-black ${
                      user.rank === 1 ? 'text-amber-400' :
                      user.rank === 2 ? 'text-slate-300' :
                      user.rank === 3 ? 'text-amber-600' : 'text-slate-650'
                    }`}>
                      #{user.rank}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[10px] text-indigo-450 font-bold flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-slate-500" />
                        {user.badge}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-black text-white">{user.xp} XP</p>
                    <p className="text-[9px] text-slate-500 font-bold">{user.solved} solved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
