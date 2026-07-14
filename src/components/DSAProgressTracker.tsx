"use client";

import { useState } from "react";

interface TopicProgress {
  name: string;
  solved: number;
  total: number;
  difficulty: "easy" | "medium" | "hard";
}

interfaceDSAProgressTrackerProps {
  topics: TopicProgress[];
}

export function DSAProgressTracker({ topics }: DSAProgressTrackerProps) {
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all");

  const filteredTopics = topics.filter(
    (t) => filter === "all" || t.difficulty === filter
  );

  const totalSolved = topics.reduce((acc, t) => acc + t.solved, 0);
  const totalProblems = topics.reduce((acc, t) => acc + t.total, 0);
  const overallPercentage = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const difficultyColors = {
    easy: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
    medium: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
    hard: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          DSA Progress
        </h3>
        <div className="text-right">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {overallPercentage}%
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {totalSolved} / {totalProblems} solved
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4" role="tablist" aria-label="Filter by difficulty">
        {(["all", "easy", "medium", "hard"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            role="tab"
            aria-selected={filter === f}
            className={`px-3 py-1 text-xs font-medium rounded-full capitalize transition-colors ${
              filter === f
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Topic list */}
      <ul className="space-y-3">
        {filteredTopics.map((topic) => {
          const pct = topic.total > 0 ? Math.round((topic.solved / topic.total) * 100) : 0;
          return (
            <li key={topic.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{topic.name}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {topic.solved}/{topic.total}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct === 100
                        ? "bg-green-500"
                        : pct >= 50
                        ? "bg-indigo-500"
                        : "bg-gray-400 dark:bg-gray-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${difficultyColors[topic.difficulty]}`}>
                  {topic.difficulty}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
