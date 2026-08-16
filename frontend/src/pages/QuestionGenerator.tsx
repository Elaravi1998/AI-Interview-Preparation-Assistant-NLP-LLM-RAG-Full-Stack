import React, { useState } from 'react';
import { HelpCircle, Sparkles, Filter, Code, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { Question } from '../types';
import { LoadingState } from '../components/LoadingState';

export const QuestionGenerator: React.FC = () => {
  const [category, setCategory] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q-101',
      category: 'Technical',
      difficulty: 'Medium',
      question: 'In your project "E-Commerce Real-time Analytics Engine", how did you use MongoDB aggregations and Node.js streams to maintain performance under 50k events/sec throughput?',
      idealAnswerKeyPoints: ['Multi-stage aggregation pipeline', 'Stream backpressure management', 'ESR compound indexing'],
      resumeContext: 'Extracted from resume project: E-Commerce Real-time Analytics Engine'
    },
    {
      id: 'q-102',
      category: 'System Design',
      difficulty: 'Hard',
      question: 'How would you architect a Retrieval-Augmented Generation (RAG) system with serverless Netlify Functions and vector similarity search for real-time document search?',
      idealAnswerKeyPoints: ['Chunking & overlap strategies', 'Dense vector embedding generation', 'Cosine similarity search', 'Context window grounding'],
      resumeContext: 'Targeted from skill gap: RAG & Serverless Architecture'
    },
    {
      id: 'q-103',
      category: 'Behavioral',
      difficulty: 'Medium',
      question: 'Describe a situation where a production microservice experienced latency bottlenecks or connection exhaustion. How did you diagnose the root cause?',
      idealAnswerKeyPoints: ['Monitoring metrics inspection', 'Thread pool / connection pool tuning', 'Blameless post-mortem analysis'],
      resumeContext: 'Assessing Senior Full Stack candidate experience'
    }
  ]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await interviewService.generateQuestions({
        category,
        difficulty,
        count,
        resumeContext: 'Candidate has React, Node.js, MongoDB, TypeScript, AWS, Docker experience.',
        jobContext: 'Target job requires React, Node.js, MongoDB, Kubernetes, Kafka, RAG.'
      });
      if (res.success && res.data?.questions) {
        setQuestions(res.data.questions);
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
            <HelpCircle className="w-6 h-6 text-indigo-400" /> AI Interview Question Generator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate candidate-specific interview questions grounded in your resume projects, technical stack, and job posting gaps.
          </p>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
          <Filter className="w-4 h-4 text-indigo-400" /> Question Generation Configuration
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Coding">Coding</option>
              <option value="System Design">System Design</option>
              <option value="Project">Project Based</option>
              <option value="HR">HR & Cultural</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Count */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Number of Questions</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Customized Questions</span>
        </button>
      </div>

      {/* Questions Output List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Generated Questions ({questions.length})
          </h3>
          <Link
            to="/mock-interview"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>Start Mock Interview with these Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <LoadingState message="Generating candidate-tailored questions via OpenRouter LLM..." />
        ) : (
          <div className="grid gap-4">
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                    #{idx + 1} • {q.category}
                  </span>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${
                    q.difficulty === 'Hard' ? 'text-rose-400 bg-rose-500/10 border-rose-500/30' :
                    q.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
                    'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-white leading-relaxed">
                  {q.question}
                </h4>

                {q.resumeContext && (
                  <p className="text-xs text-slate-400 italic">
                    💡 <strong>Grounding Context:</strong> {q.resumeContext}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Expected Evaluation Key Points:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {q.idealAnswerKeyPoints.map((kp, kIdx) => (
                      <span key={kIdx} className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded-md">
                        • {kp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
