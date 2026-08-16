import React, { useState } from 'react';
import { Target, Sparkles, CheckCircle2, AlertTriangle, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { SkillGapAnalysis } from '../types';
import { SkillBadge } from '../components/SkillBadge';
import { LoadingState } from '../components/LoadingState';

export const SkillGap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [gapData, setGapData] = useState<SkillGapAnalysis | null>({
    strongSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs'],
    moderateSkills: ['AWS', 'Docker', 'Python'],
    missingSkills: ['Kubernetes', 'Kafka', 'LLMs', 'RAG'],
    recommendations: [
      {
        skill: 'Kubernetes',
        whyItMatters: 'Target Job Posting requires container orchestration for scaling microservices.',
        topicsToLearn: [
          'Control Plane & Worker Architecture (kube-apiserver, etcd)',
          'Pods, Deployments & StatefulSets',
          'Services (ClusterIP, NodePort, LoadBalancer) & Ingress Controllers',
          'Horizontal Pod Autoscaler (HPA)'
        ],
        sampleQuestions: [
          'What is the difference between a K8s Deployment and a StatefulSet?',
          'How does Kubernetes execute a zero-downtime rolling update?'
        ]
      },
      {
        skill: 'Kafka',
        whyItMatters: 'Essential for high-throughput event-driven microservices architecture.',
        topicsToLearn: [
          'Kafka Architecture (Brokers, Topics, Partitions)',
          'Producers, Consumers & Consumer Groups',
          'Log Compaction & Offset Retention',
          'Kafka vs RabbitMQ trade-offs'
        ],
        sampleQuestions: [
          'How does Kafka guarantee message ordering across partitions?',
          'What happens when a consumer node fails inside a consumer group?'
        ]
      },
      {
        skill: 'RAG Architecture',
        whyItMatters: 'Crucial for enterprise Generative AI context grounding without hallucinations.',
        topicsToLearn: [
          'Document Chunking & Overlap Strategies',
          'Dense Embedding Vectors & Vector Indexing (HNSW, Cosine Similarity)',
          'Hybrid Search (Dense Vectors + BM25 Sparse Keywords)',
          'Context Window Synthesizer Grounding'
        ],
        sampleQuestions: [
          'Explain the step-by-step pipeline of a Retrieval-Augmented Generation application.',
          'How do you prevent context window loss in large document RAG?'
        ]
      }
    ]
  });

  const handleRegenerateGap = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getSkillGap(
        ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
        ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Python', 'Docker', 'AWS', 'Kubernetes', 'Kafka', 'LLMs', 'RAG']
      );
      if (res.success && res.data) {
        setGapData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Target className="w-6 h-6 text-indigo-400" /> Skill Gap Analysis & Curriculum
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Analyze skill deficiencies, learn why they matter for your target role, and prepare targeted interview questions.
          </p>
        </div>
        <button
          onClick={handleRegenerateGap}
          disabled={loading}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Re-run Gap Analysis</span>
        </button>
      </div>

      {loading ? (
        <LoadingState message="Generating tailored skill gap recommendations..." />
      ) : gapData ? (
        <div className="space-y-8">
          {/* 3 Skill Tiers Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Strong */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> Verified Strong Skills
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {gapData.strongSkills.map((s, i) => (
                  <SkillBadge key={i} skill={s} type="matched" />
                ))}
              </div>
            </div>

            {/* Moderate */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" /> Moderate / Related Skills
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {gapData.moderateSkills.map((s, i) => (
                  <SkillBadge key={i} skill={s} type="partial" />
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4" /> Missing Target Skills
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {gapData.missingSkills.map((s, i) => (
                  <SkillBadge key={i} skill={s} type="missing" />
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Skill Recommendations List */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" /> Topic Breakdown & Suggested Learning Curricula
            </h3>

            {gapData.recommendations.map((rec, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-lg">
                      Missing Skill: {rec.skill}
                    </span>
                  </div>
                  <Link
                    to="/study-assistant"
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <span>Study in RAG Assistant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-amber-300">Why it matters:</strong> {rec.whyItMatters}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Key Topics */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Core Topics to Master:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {rec.topicsToLearn.map((top, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-indigo-400 font-bold">•</span>
                          <span>{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Interview Questions */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Expected Interview Drills:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {rec.sampleQuestions.map((q, qIdx) => (
                        <li key={qIdx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 italic">
                          "{q}"
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Link
              to="/interview-plan"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
            >
              <span>Generate 7-Day Personalized Interview Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};
