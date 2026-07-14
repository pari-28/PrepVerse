"use client";

import { CheckCircle2, Circle } from "lucide-react";

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
}

interface ResumeProgressProps {
  steps: ProgressStep[];
  currentStep?: string;
}

export function ResumeProgress({ steps, currentStep }: ResumeProgressProps) {
  const completedCount = steps.filter((s) => s.completed).length;
  const totalCount = steps.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Resume Completion
        </h3>
        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Resume ${percentage}% complete`}
        />
      </div>

      {/* Step list */}
      <ul className="space-y-3" aria-label="Resume sections">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex items-center gap-3 text-sm ${
              step.completed
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {step.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            ) : (
              <Circle
                className={`h-5 w-5 shrink-0 ${
                  currentStep === step.id
                    ? "text-indigo-500 fill-indigo-100"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            )}
            <span className={step.completed ? "line-through opacity-70" : ""}>
              {step.label}
            </span>
            {currentStep === step.id && !step.completed && (
              <span className="ml-auto text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                In progress
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
