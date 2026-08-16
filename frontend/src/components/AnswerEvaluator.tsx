import React from 'react';
import { CheckCircle2, XCircle, Lightbulb, Award, BookOpen } from 'lucide-react';
import { AnswerEvaluation } from '../types';
import { ScoreCard } from './ScoreCard';

interface AnswerEvaluatorProps {
  evaluation: AnswerEvaluation;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const AnswerEvaluator: React.FC<AnswerEvaluatorProps> = ({
  evaluation,
  onNextQuestion,
  isLastQuestion
}) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">AI Rubric Evaluation Results</h4>
            <p className="text-xs text-slate-400">Scored via NLP Keyword Analysis & OpenRouter LLM</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-emerald-400">{evaluation.overallScore}/100</div>
          <span className="text-[10px] uppercase font-semibold text-slate-400">Overall Answer Score</span>
        </div>
      </div>

      {/* 5-Criteria Rubric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <ScoreCard label="Technical Accuracy" score={evaluation.technicalAccuracy} maxScore={10} />
        <ScoreCard label="Relevance" score={evaluation.relevance} maxScore={10} />
        <ScoreCard label="Completeness" score={evaluation.completeness} maxScore={10} />
        <ScoreCard label="Clarity" score={evaluation.clarity} maxScore={10} />
        <ScoreCard label="Communication" score={evaluation.communication} maxScore={10} />
      </div>

      {/* Strengths & Weaknesses Split */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
          <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Strong Points
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {evaluation.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-400">✓</span> {str}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Missing Concepts */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
          <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <XCircle className="w-4 h-4" /> Areas for Improvement
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {evaluation.weaknesses.map((wk, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-400">✗</span> {wk}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Improvements */}
      {evaluation.improvements && evaluation.improvements.length > 0 && (
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
          <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" /> Actionable Coaching Tips
          </h5>
          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
            {evaluation.improvements.map((imp, idx) => (
              <li key={idx}>{imp}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Ideal Answer Reference */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" /> Ideal Architectural Answer Model
        </h5>
        <p className="text-xs text-slate-300 leading-relaxed font-mono">
          {evaluation.idealAnswer}
        </p>
      </div>

      {/* Next Action Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextQuestion}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
        >
          {isLastQuestion ? 'Complete Interview & View Final Report' : 'Proceed to Next Question →'}
        </button>
      </div>
    </div>
  );
};
