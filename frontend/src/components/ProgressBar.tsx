import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  subLabel?: string;
  color?: 'indigo' | 'emerald' | 'amber';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  subLabel,
  color = 'indigo'
}) => {
  const gradients = {
    indigo: 'from-indigo-600 to-indigo-400',
    emerald: 'from-emerald-600 to-emerald-400',
    amber: 'from-amber-600 to-amber-400',
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || subLabel) && (
        <div className="flex items-center justify-between text-xs font-medium">
          {label && <span className="text-slate-300">{label}</span>}
          {subLabel && <span className="text-slate-400">{subLabel}</span>}
        </div>
      )}
      <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${gradients[color]} transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};
