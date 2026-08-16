import React from 'react';

interface SkillBadgeProps {
  skill: string;
  type?: 'matched' | 'missing' | 'partial' | 'neutral';
  count?: number;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, type = 'neutral', count }) => {
  const styles = {
    matched: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
    missing: 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20',
    partial: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20',
    neutral: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20',
  };

  const icons = {
    matched: '✓ ',
    missing: '✗ ',
    partial: '△ ',
    neutral: '',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border rounded-lg transition-colors cursor-default ${styles[type]}`}>
      <span className="font-bold mr-1">{icons[type]}</span>
      {skill}
      {count !== undefined && <span className="ml-1.5 opacity-75 text-[10px]">({count})</span>}
    </span>
  );
};
