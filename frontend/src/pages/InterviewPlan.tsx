import React, { useState } from 'react';
import { Calendar, Sparkles, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { InterviewPlanData } from '../types';
import { LoadingState } from '../components/LoadingState';

export const InterviewPlan: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState<InterviewPlanData | null>({
    role: 'Senior Full Stack AI Developer',
    plan: [
      {
        day: 1,
        topic: 'JavaScript Language Fundamentals',
        focus: 'Event loop architecture, closures, promises, & memory leaks',
        tasks: [
          'Review microtask queue vs macrotask execution order',
          'Practice writing custom Promise polyfill',
          'Solve 3 closure lexical scope scoping drills'
        ]
      },
      {
        day: 2,
        topic: 'React Architecture & State Optimization',
        focus: 'Fiber reconciliation algorithm, hooks, & render profiling',
        tasks: [
          'Audit useCallback vs useMemo optimization patterns',
          'Build custom hook with state deduplication',
          'Review React Fiber diffing heuristics'
        ]
      },
      {
        day: 3,
        topic: 'Node.js & Asynchronous Systems',
        focus: 'Non-blocking I/O, libuv thread pool, & stream backpressure',
        tasks: [
          'Implement custom Transform stream for data pipelines',
          'Configure process cluster mode with round-robin load distribution',
          'Review EventEmitter memory leak handling'
        ]
      },
      {
        day: 4,
        topic: 'Databases & Query Optimization',
        focus: 'MongoDB ESR rule, aggregation frameworks, & SQL ACID rules',
        tasks: [
          'Design compound MongoDB indexes obeying Equality, Sort, Range rules',
          'Write multi-stage aggregation with $lookup and $facet',
          'Compare PostgreSQL transaction isolation levels'
        ]
      },
      {
        day: 5,
        topic: 'System Design & High-Availability',
        focus: 'Load balancing, Redis caching patterns, & message streams',
        tasks: [
          'Map Cache-Aside vs Write-Through caching trade-offs',
          'Design distributed URL Shortener handling 100M DAU',
          'Review Kafka partition ordering and consumer offsets'
        ]
      },
      {
        day: 6,
        topic: 'DevOps & AI RAG Skill Gaps',
        focus: 'Docker multi-stage builds, K8s ingress, & RAG embeddings',
        tasks: [
          'Optimize Dockerfile using Alpine base & multi-stage binaries',
          'Review Kubernetes StatefulSets vs Deployments',
          'Study Cosine Similarity search over dense vector embeddings'
        ]
      },
      {
        day: 7,
        topic: 'Mock Interview & STAR Behavioral Drills',
        focus: 'Live AI candidate mock session & STAR methodology',
        tasks: [
          'Execute full 10-question AI Mock Interview session',
          'Review 5-criteria rubric evaluation report',
          'Refine behavioral responses using Situation-Task-Action-Result'
        ]
      }
    ]
  });

  const handleRegeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getInterviewPlan(
        ['React', 'Node.js', 'MongoDB'],
        ['Kubernetes', 'Kafka', 'RAG'],
        'Senior Full Stack AI Developer'
      );
      if (res.success && res.data) {
        setPlanData(res.data);
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
            <Calendar className="w-6 h-6 text-indigo-400" /> Personalized 7-Day Interview Plan
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Day-by-day structured curriculum tailored specifically to your target role: <span className="text-indigo-300 font-semibold">{planData?.role}</span>.
          </p>
        </div>
        <button
          onClick={handleRegeneratePlan}
          disabled={loading}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Regenerate Plan</span>
        </button>
      </div>

      {loading ? (
        <LoadingState message="Generating personalized 7-day interview study roadmap..." />
      ) : planData ? (
        <div className="space-y-6">
          <div className="grid gap-4">
            {planData.plan.map((item) => (
              <div
                key={item.day}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-700 transition-all shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-extrabold text-base shrink-0 shadow-lg shadow-indigo-600/20">
                    Day {item.day}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{item.topic}</h3>
                    <p className="text-xs text-indigo-300 font-medium">Focus: {item.focus}</p>

                    <div className="pt-2 space-y-1">
                      {item.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  to={item.day === 7 ? "/mock-interview" : "/study-assistant"}
                  className="px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-all shrink-0 flex items-center space-x-1.5"
                >
                  <span>{item.day === 7 ? "Start Mock Drill" : "Study Topics"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-center space-y-3">
            <h4 className="text-sm font-bold text-white">Ready to test your readiness?</h4>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Launch a live AI Mock Interview session to get real-time rubric scores and feedback.
            </p>
            <Link
              to="/mock-interview"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Mock Interview</span>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};
