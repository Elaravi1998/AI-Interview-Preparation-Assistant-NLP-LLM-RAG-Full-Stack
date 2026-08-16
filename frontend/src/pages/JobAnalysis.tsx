import React, { useState } from 'react';
import { Briefcase, Sparkles, CheckCircle2, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { ParsedJobData, ResumeJobMatch } from '../types';
import { LoadingState } from '../components/LoadingState';
import { SkillBadge } from '../components/SkillBadge';
import { ProgressBar } from '../components/ProgressBar';

export const JobAnalysis: React.FC = () => {
  const [jobText, setJobText] = useState(`Senior Full Stack AI Developer - Innovate AI
Responsibilities:
- Architect scalable React web applications with serverless API backends.
- Implement RAG workflows with vector indexing and OpenRouter LLMs.
- Maintain MongoDB database schemas and pipeline optimizations.

Required Skills: React, Node.js, TypeScript, MongoDB, Python, Docker, AWS.
Preferred Skills: Kubernetes, Kafka, LLMs, RAG, LangChain.
Experience: 3+ years.`);

  const [loading, setLoading] = useState(false);
  const [parsedJob, setParsedJob] = useState<ParsedJobData | null>({
    jobTitle: 'Senior Full Stack AI Developer',
    company: 'Innovate AI',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Python', 'Docker', 'AWS'],
    preferredSkills: ['Kubernetes', 'Kafka', 'LLMs', 'RAG', 'LangChain'],
    softSkills: ['Problem Solving', 'Cross-team Collaboration', 'Communication'],
    experience: '3+ years',
    responsibilities: [
      'Architect scalable React web applications with serverless API backends.',
      'Implement RAG workflows with vector indexing and OpenRouter LLMs.',
      'Maintain MongoDB database schemas and pipeline optimizations.'
    ]
  });

  const [matchResult, setMatchResult] = useState<ResumeJobMatch | null>({
    overallMatch: 82,
    matchedSkills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Python', 'Docker'],
    missingSkills: ['Kubernetes', 'Kafka', 'LLMs', 'RAG'],
    partialMatchSkills: ['AWS'],
    methodology: 'Calculated via weighted exact token overlap (1.0 weight) plus domain semantic similarity (0.5 weight).'
  });

  const handleAnalyzeJob = async () => {
    if (!jobText || jobText.trim().length < 20) return;
    setLoading(true);
    try {
      const jobRes = await resumeService.analyzeJob(jobText);
      if (jobRes.success && jobRes.data?.parsedData) {
        const pj = jobRes.data.parsedData;
        setParsedJob(pj);

        const matchRes = await resumeService.matchResumeJob(
          ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Python', 'AWS', 'Docker', 'REST APIs'],
          pj.requiredSkills || [],
          pj.preferredSkills || []
        );
        if (matchRes.success && matchRes.data) {
          setMatchResult(matchRes.data);
        }
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
            <Briefcase className="w-6 h-6 text-indigo-400" /> Job Description NLP & Match Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Analyze target job descriptions, extract technical requirements, and compute candidate match score.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Job Text Input */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" /> Target Job Posting Text
          </h3>

          <textarea
            rows={12}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste Job Description requirements..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-indigo-500 leading-relaxed"
          />

          <button
            onClick={handleAnalyzeJob}
            disabled={loading || jobText.trim().length < 20}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Job & Compute Match Score</span>
          </button>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {loading ? (
            <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800">
              <LoadingState message="Extracting job requirements and computing semantic match..." />
            </div>
          ) : (
            <>
              {/* Match Score Card */}
              {matchResult && (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Candidate Match Score</span>
                      <h3 className="text-3xl font-extrabold text-white mt-1">{matchResult.overallMatch}%</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 font-bold text-sm">
                      MATCH VERIFIED
                    </div>
                  </div>

                  <ProgressBar progress={matchResult.overallMatch} color="emerald" />

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong>Methodology:</strong> {matchResult.methodology}
                  </p>

                  <div className="flex justify-end pt-2">
                    <Link
                      to="/skill-gap"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl flex items-center space-x-1.5 transition-colors"
                    >
                      <span>Proceed to Skill Gap Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Parsed Job Breakdown */}
              {parsedJob && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{parsedJob.jobTitle}</h3>
                      <span className="text-xs text-indigo-400">{parsedJob.company} • {parsedJob.experience}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-semibold text-slate-300 block mb-1.5">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {parsedJob.requiredSkills.map((sk, idx) => (
                          <SkillBadge key={idx} skill={sk} type="matched" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-300 block mb-1.5">Preferred Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {parsedJob.preferredSkills.map((sk, idx) => (
                          <SkillBadge key={idx} skill={sk} type="partial" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
