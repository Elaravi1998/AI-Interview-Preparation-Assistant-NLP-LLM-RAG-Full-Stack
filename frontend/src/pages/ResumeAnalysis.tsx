import React, { useState } from 'react';
import { FileText, Upload, Sparkles, User, Briefcase, GraduationCap, Code, CheckCircle2 } from 'lucide-react';
import { resumeService } from '../services/resumeService';
import { ParsedResumeData } from '../types';
import { LoadingState } from '../components/LoadingState';
import { SkillBadge } from '../components/SkillBadge';

export const ResumeAnalysis: React.FC = () => {
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>({
    personalInfo: { name: 'Alex Morgan', email: 'alex.morgan@example.com', phone: '+1 (555) 234-5678', location: 'San Francisco, CA' },
    experience: [
      { jobTitle: 'Senior Full Stack Engineer', company: 'TechNova Solutions', years: '3.5 years', responsibilities: 'Designed microservices, built React dashboards, implemented MongoDB aggregations and Kafka pipelines.' },
      { jobTitle: 'Software Developer', company: 'CloudScale Inc.', years: '2 years', responsibilities: 'Developed REST APIs using Node.js, optimized SQL queries, and integrated AWS S3 services.' }
    ],
    skills: {
      technical: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'SQL', 'AWS', 'Docker', 'Python', 'Kafka', 'REST APIs'],
      soft: ['Problem Solving', 'Communication', 'Teamwork', 'Agile Leadership']
    },
    education: [{ degree: 'B.S. Computer Science', institution: 'University of California, Berkeley', year: '2020' }],
    projects: [{ name: 'E-Commerce Real-time Analytics Engine', technologies: ['React', 'Node.js', 'Kafka', 'MongoDB'], description: 'High-throughput streaming dashboard handling 50k events per second.' }]
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileData = event.target?.result as string;
      try {
        const uploadRes = await resumeService.uploadResume(file.name, fileData);
        if (uploadRes.success && uploadRes.data?.rawText) {
          setRawText(uploadRes.data.rawText);
          const analyzeRes = await resumeService.analyzeResume(uploadRes.data.rawText, uploadRes.data.resumeId);
          if (analyzeRes.success && analyzeRes.data?.parsedData) {
            setParsedData(analyzeRes.data.parsedData);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleTextAnalyze = async () => {
    if (!rawText || rawText.trim().length < 20) return;
    setLoading(true);
    try {
      const res = await resumeService.analyzeResume(rawText);
      if (res.success && res.data?.parsedData) {
        setParsedData(res.data.parsedData);
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
            <FileText className="w-6 h-6 text-indigo-400" /> Resume NLP Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Extract structured candidate metadata, experience, technical skills, and projects using OpenRouter NLP.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload & Paste Panel */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Upload className="w-4 h-4 text-indigo-400" /> Upload PDF or Paste Text
          </h3>

          {/* PDF Drag-and-Drop Dropzone */}
          <label className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors block bg-slate-950/50 group">
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-200">Click to upload candidate resume PDF</span>
              <span className="text-[11px] text-slate-400">PDF up to 10MB supported. Parsed serverless-side securely.</span>
            </div>
          </label>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="px-3 bg-slate-900 text-[11px] font-semibold text-slate-400 uppercase relative">OR</span>
          </div>

          {/* Raw Text Input */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">Paste Raw Resume Text</label>
            <textarea
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste candidate resume contents here..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleTextAnalyze}
            disabled={loading || rawText.trim().length < 20}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run NLP Skill Extraction</span>
          </button>
        </div>

        {/* Structured Results Display */}
        <div className="space-y-6">
          {loading ? (
            <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800">
              <LoadingState message="Extracting candidate entities, skills, and projects..." />
            </div>
          ) : parsedData ? (
            <div className="space-y-6">
              {/* Personal Info Card */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{parsedData.personalInfo.name || 'Candidate Name'}</h3>
                    <p className="text-xs text-slate-400">{parsedData.personalInfo.email} • {parsedData.personalInfo.phone} • {parsedData.personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Technical & Soft Skills */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-400" /> Extracted Technical & Soft Skills
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Technical Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedData.skills.technical.map((sk, idx) => (
                        <SkillBadge key={idx} skill={sk} type="matched" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Soft Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedData.skills.soft.map((sk, idx) => (
                        <SkillBadge key={idx} skill={sk} type="neutral" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" /> Work Experience
                </h4>
                <div className="space-y-3">
                  {parsedData.experience.map((exp, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-indigo-300">{exp.jobTitle}</span>
                        <span className="text-slate-400">{exp.years}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block font-medium">{exp.company}</span>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">{exp.responsibilities}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              {parsedData.projects && parsedData.projects.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" /> Highlighted Projects
                  </h4>
                  {parsedData.projects.map((proj, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-bold text-amber-300 block">{proj.name}</span>
                      <p className="text-xs text-slate-300">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
