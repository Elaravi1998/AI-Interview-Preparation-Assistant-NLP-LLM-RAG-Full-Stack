import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Analyzing data with AI...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
      <span className="text-sm font-medium text-slate-300">{message}</span>
    </div>
  );
};
