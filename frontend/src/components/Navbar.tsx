import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, User, LogOut, Bell, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                  PrepAI <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full">Pro</span>
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:block">AI Interview Assistant</span>
              </div>
            </Link>
          </div>

          {/* Quick Nav Links & User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/study-assistant"
                  className="hidden md:flex items-center space-x-2 px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>RAG Study Assistant</span>
                </Link>

                <button className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
                  <Link to="/profile" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                      {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white hidden lg:block">
                      {user?.name || 'Candidate'}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-4 py-2 text-sm text-slate-300 hover:text-white font-medium">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
