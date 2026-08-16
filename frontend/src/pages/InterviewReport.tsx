import React, { useEffect, useState } from 'react';
import { BarChart3, Award, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, RotateCcw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { reportService } from '../services/reportService';
import { InterviewReportData } from '../types';
import { ScoreCard } from '../components/ScoreCard';
import { LoadingState } from '../components/LoadingState';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];

export const InterviewReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<InterviewReportData | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await reportService.getReport();
        if (res.success && res.data) {
          setReport(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, []);

  if (loading) return <LoadingState message="Loading final candidate evaluation report..." />;

  const chartScores = [
    { name: 'Overall', score: report?.overallScore || 82 },
    { name: 'Technical', score: report?.technicalScore || 78 },
    { name: 'Communication', score: report?.communicationScore || 81 },
    { name: 'Problem Solving', score: report?.problemSolvingScore || 84 },
  ];

  const pieData = [
    { name: 'Technical Accuracy', value: report?.technicalScore || 78 },
    { name: 'Communication', value: report?.communicationScore || 81 },
    { name: 'Problem Solving', value: report?.problemSolvingScore || 84 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-indigo-400" /> Comprehensive Interview Report
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated performance metrics, strong competencies, missing technical concepts, and Readiness Score.
          </p>
        </div>

        <Link
          to="/mock-interview"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Mock Session</span>
        </Link>
      </div>

      {/* Hero Readiness Score Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
            <ShieldCheck className="w-4 h-4" /> AI Candidate Preparation Indicator
          </span>
          <h2 className="text-3xl font-extrabold text-white">Interview Readiness</h2>
          <span className="inline-block px-3 py-1 text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg">
            {report?.readinessStatus || "READY WITH IMPROVEMENT"}
          </span>
          <p className="text-[11px] text-slate-400 max-w-lg leading-relaxed pt-1">
            *Disclaimer: This is an AI-generated preparation readiness indicator based on rubric accuracy, resume matching, and communication clarity. It is not a formal job guarantee.
          </p>
        </div>

        <div className="text-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0">
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
            {report?.readinessScore || 79}%
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Readiness Index</span>
        </div>
      </div>

      {/* 4 Score Breakdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard label="Overall Score" score={report?.overallScore || 82} />
        <ScoreCard label="Technical Score" score={report?.technicalScore || 78} />
        <ScoreCard label="Communication Score" score={report?.communicationScore || 81} />
        <ScoreCard label="Problem Solving" score={report?.problemSolvingScore || 84} />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" /> Score Metrics Comparison
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartScores}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#475569" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Distribution */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> Rubric Competency Weighting
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strong vs Weak Areas */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Strongest Competency Areas
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {report?.strongAreas.map((sa, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{sa}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Priority Areas for Growth
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {report?.weakAreas.map((wa, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>{wa}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Preparation Topics */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Recommended Review Modules
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {report?.recommendedTopics.map((top, idx) => (
            <Link
              key={idx}
              to="/study-assistant"
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-xs text-slate-300 flex items-center justify-between transition-colors"
            >
              <span>{top}</span>
              <span className="text-indigo-400 font-semibold">Study →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
