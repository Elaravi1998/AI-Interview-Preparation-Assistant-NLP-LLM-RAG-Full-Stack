import React from 'react';

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  label,
  score,
  maxScore = 100,
  description,
  size = 'md'
}) => {
  const percentage = Math.round((score / maxScore) * 100);

  let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (percentage < 60) badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  else if (percentage < 75) badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';

  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-300">{label}</span>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${badgeColor}`}>
          {score}/{maxScore}
        </span>
      </div>

      <div className="mt-3">
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {description && <p className="text-[11px] text-slate-400 mt-2">{description}</p>}
    </div>
  );
};
