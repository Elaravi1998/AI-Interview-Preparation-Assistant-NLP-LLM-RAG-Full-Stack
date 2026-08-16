import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Briefcase,
  Target,
  Calendar,
  Video,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { DashboardCard } from '../components/DashboardCard';
import { SkillBadge } from '../components/SkillBadge';
import { useAuth } from '../context/AuthContext';

const radarScoreData = [
  { subject: 'Technical Accuracy', score: 78 },
  { subject: 'Communication', score: 81 },
  { subject: 'Problem Solving', score: 84 },
  { subject: 'Relevance', score: 85 },
  { subject: 'System Design', score: 76 },
];

const categoryPerformance = [
  { name: 'React & JS', score: 85 },
  { name: 'Node & APIs', score: 82 },
  { name: 'MongoDB & SQL', score: 78 },
  { name: 'System Architecture', score: 72 },
  { name: 'DevOps & Cloud', score: 65 },
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Interview Readiness Platform</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome back, {user?.name || 'Alex'}!
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Your candidate preparation profile is active. You have achieved an <strong className="text-emerald-400">82% Resume-JD Match</strong> and an overall <strong className="text-indigo-400">79% Interview Readiness Score</strong>.
          </p>
        </div>

        <Link
          to="/mock-interview"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all shrink-0 flex items-center space-x-2 group z-10"
        >
          <Video className="w-4 h-4" />
          <span>Launch AI Mock Interview</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4 Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Resume Match"
          value="82%"
          subtitle="Target Role: Senior Full Stack Engineer"
          icon={FileText}
          trend="+5% from last upload"
          color="emerald"
        />
        <DashboardCard
          title="Technical Score"
          value="78%"
          subtitle="Rubric accuracy across 12 questions"
          icon={Target}
          trend="Strong in React & Node"
          color="indigo"
        />
        <DashboardCard
          title="Communication"
          value="81%"
          subtitle="Clarity & structured delivery"
          icon={Award}
          trend="STAR method recommended"
          color="purple"
        />
        <DashboardCard
          title="Interview Readiness"
          value="79%"
          subtitle="READY WITH IMPROVEMENT"
          icon={TrendingUp}
          trend="AI Candidate Indicator"
          color="amber"
        />
      </div>

      {/* Analytics Charts & Details Split */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Radar Performance Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" /> Skill & Competency Breakdown
            </h3>
            <span className="text-[11px] text-slate-400">Rubric radar</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarScoreData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Candidate Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Domain Technical Proficiency (%)
            </h3>
            <span className="text-[11px] text-slate-400">5 Domain Modules</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#475569" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="score" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Skills Breakdown & Action Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strongest vs Missing Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Skills Overview (Resume vs JD)
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">Verified Strong Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                <SkillBadge skill="React" type="matched" />
                <SkillBadge skill="Node.js" type="matched" />
                <SkillBadge skill="TypeScript" type="matched" />
                <SkillBadge skill="MongoDB" type="matched" />
                <SkillBadge skill="Python" type="matched" />
                <SkillBadge skill="REST APIs" type="matched" />
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 block mb-2">Target Skill Gaps:</span>
              <div className="flex flex-wrap gap-1.5">
                <SkillBadge skill="Kubernetes" type="missing" />
                <SkillBadge skill="Kafka" type="missing" />
                <SkillBadge skill="LLMs & RAG" type="missing" />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> High-Priority Action Items
          </h3>

          <div className="space-y-2.5">
            <Link
              to="/skill-gap"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors group"
            >
              <div>
                <span className="text-xs font-semibold text-white block">Review Kubernetes & Kafka Skill Gap</span>
                <span className="text-[11px] text-slate-400">Target missing requirements in Job Description</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </Link>

            <Link
              to="/interview-plan"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors group"
            >
              <div>
                <span className="text-xs font-semibold text-white block">Execute Day 4 Preparation Schedule</span>
                <span className="text-[11px] text-slate-400">Databases, MongoDB indexing & SQL transactions</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </Link>

            <Link
              to="/study-assistant"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors group"
            >
              <div>
                <span className="text-xs font-semibold text-white block">Query RAG Technical Study Assistant</span>
                <span className="text-[11px] text-slate-400">Explore system design & Transformer architecture questions</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
