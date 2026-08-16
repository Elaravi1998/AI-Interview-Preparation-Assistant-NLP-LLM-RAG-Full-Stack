import React, { useState } from 'react';
import { BookOpen, Sparkles, Search, Layers, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { reportService } from '../services/reportService';
import { RAGStudyResponse } from '../types';
import { LoadingState } from '../components/LoadingState';

const SAMPLE_QUERIES = [
  "Explain RAG simply.",
  "Explain Kafka architecture.",
  "Explain MongoDB indexing ESR rule.",
  "Kafka vs RabbitMQ?",
  "Explain React Fiber reconciliation.",
  "Explain Docker multi-stage builds."
];

export const StudyAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RAGStudyResponse | null>({
    query: "Explain RAG simply.",
    answer: `### Retrieval-Augmented Generation (RAG) Architecture

Retrieval-Augmented Generation (RAG) is a modern AI design pattern that enhances Large Language Models (LLMs) by retrieving verified external enterprise documents before generating responses [Source 1].

#### Key Stages in a RAG Pipeline:
1. **Ingestion & Chunking**: Split technical documents into optimal sentence or semantic chunks with overlapping boundaries.
2. **Dense Embeddings & Vector Indexing**: Convert document chunks into dense floating-point vector representations using embedding models, indexed inside a vector database [Source 1].
3. **Similarity Retrieval**: Execute query vector search (e.g. Cosine Similarity or HNSW index search) combined with sparse BM25 keyword matching to retrieve top-k relevant context chunks.
4. **Context Window Grounding**: Pass the retrieved chunks directly into the LLM system prompt. The model answers authoritatively using real source facts, eliminating hallucinations.`,
    sources: [
      {
        sourceId: "Source 1",
        title: "Retrieval-Augmented Generation Architecture, Vector Search, and Context Injection",
        topic: "RAG",
        category: "Generative AI System",
        relevanceScore: "96%",
        keyConcepts: ["Document Chunking", "Dense Vector Embeddings", "Cosine Similarity", "Context Window Grounding"],
        sampleQuestions: ["Explain the step-by-step flow of a RAG pipeline from query to augmented response."]
      }
    ]
  });

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q || !q.trim()) return;

    setLoading(true);
    try {
      const res = await reportService.queryStudyAssistant(q);
      if (res.success && res.data) {
        setResult(res.data);
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
            <BookOpen className="w-6 h-6 text-indigo-400" /> RAG Technical Study Assistant
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Serverless vector & term retrieval search across 16 technical knowledge modules with LLM context grounding & citations.
          </p>
        </div>
      </div>

      {/* Query Bar & Sample Pills */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ask any technical concept (e.g. Explain Kafka, React Fiber, MongoDB indexing, RAG)..."
            className="w-full pl-12 pr-32 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow-md transition-all flex items-center space-x-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask RAG AI</span>
          </button>
        </div>

        {/* Quick Sample Query Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 block">Sample Study Queries:</span>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_QUERIES.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(sq);
                  handleSearch(sq);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-[11px] text-indigo-300 transition-colors"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Answer & Sources Display */}
      {loading ? (
        <LoadingState message="Retrieving knowledge context chunks & synthesizing grounded response..." />
      ) : result ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Answer View */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI Grounded Explanation
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Query: "{result.query}"</span>
            </div>

            <div className="prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed font-sans space-y-3 whitespace-pre-line">
              {result.answer}
            </div>
          </div>

          {/* RAG Sources Sidebar */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Retrieved Knowledge Sources ({result.sources.length})
            </h3>

            <div className="space-y-4">
              {result.sources.map((src, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                      {src.sourceId}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      Score: {src.relevanceScore}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">{src.title}</h4>
                  <span className="text-[10px] text-slate-400 block font-medium">{src.topic} • {src.category}</span>

                  <div className="pt-1">
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">Key Concepts:</span>
                    <div className="flex flex-wrap gap-1">
                      {src.keyConcepts.map((kc, kIdx) => (
                        <span key={kIdx} className="px-1.5 py-0.5 text-[9px] bg-slate-800 text-slate-300 rounded">
                          {kc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
