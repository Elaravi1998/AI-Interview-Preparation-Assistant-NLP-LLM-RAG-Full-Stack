import React from 'react';
import { User, Mail, Shield, Server, Database, Key, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <User className="w-6 h-6 text-indigo-400" /> Candidate Profile & System Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your account details and view production environment configurations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" /> User Credentials
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Candidate Name</span>
              <span className="font-bold text-white text-sm">{user?.name || 'Alex Morgan'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Email Address</span>
              <span className="font-bold text-white text-sm">{user?.email || 'alex.morgan@example.com'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Authentication Mode</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> JWT Token Authenticated (1440m TTL)
              </span>
            </div>
          </div>
        </div>

        {/* Architecture & Security Status */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Architecture Security Status
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">OpenRouter LLM Provider</span>
                <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">SERVER-SIDE ONLY</span>
              </div>
              <p className="text-[11px] text-slate-400">API Key isolated in Netlify Functions (`OPENROUTER_API_KEY`). Zero frontend leakage.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">Database Layer</span>
                <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">MONGODB ATLAS</span>
              </div>
              <p className="text-[11px] text-slate-400">Serverless connection pooling manager with fallback mock storage capability.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">Netlify Serverless APIs</span>
                <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">16 FUNCTIONS</span>
              </div>
              <p className="text-[11px] text-slate-400">REST API redirects (`/api/*` -&gt; `/.netlify/functions/*`) with CORS preflight handlers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
