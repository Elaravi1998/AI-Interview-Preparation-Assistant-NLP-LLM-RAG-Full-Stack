import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Target,
  Calendar,
  HelpCircle,
  Video,
  BarChart3,
  BookOpen,
  User,
  Sparkles
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/resume', label: 'Resume NLP', icon: FileText },
  { path: '/job-analysis', label: 'Job Analysis', icon: Briefcase },
  { path: '/skill-gap', label: 'Skill Gap', icon: Target },
  { path: '/interview-plan', label: 'Preparation Plan', icon: Calendar },
  { path: '/question-generator', label: 'Question Generator', icon: HelpCircle },
  { path: '/mock-interview', label: 'Mock Interview', icon: Video, badge: 'Live AI' },
  { path: '/interview-report', label: 'Interview Report', icon: BarChart3 },
  { path: '/study-assistant', label: 'RAG Assistant', icon: BookOpen },
  { path: '/profile', label: 'Profile', icon: User },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800/80">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 relative overflow-hidden">
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold">Netlify & OpenRouter</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            1-Deployment Netlify Architecture powered by serverless functions & LLM evaluation.
          </p>
        </div>
      </div>
    </aside>
  );
};
