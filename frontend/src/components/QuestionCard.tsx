import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Sparkles, AlertCircle, Mic, MicOff, Volume2, Trash2 } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  answerText: string;
  onAnswerChange: (val: string) => void;
  onSubmitAnswer: () => void;
  loading: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  answerText,
  onAnswerChange,
  onSubmitAnswer,
  loading
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let finalChunk = '';
        let interimChunk = '';

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalChunk += transcript + ' ';
          } else {
            interimChunk += transcript;
          }
        }

        const base = baseTextRef.current.trim();
        let full = base;
        if (finalChunk.trim()) {
          full = full ? `${full} ${finalChunk.trim()}` : finalChunk.trim();
        }
        if (interimChunk.trim()) {
          full = full ? `${full} ${interimChunk.trim()}` : interimChunk.trim();
        }

        onAnswerChange(full);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech Recognition Error:", event.error);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone access denied. Please allow mic permissions in browser settings.');
        } else if (event.error !== 'no-speech') {
          setVoiceError(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("Speech Recognition Init error:", e);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [onAnswerChange]);

  const toggleListening = () => {
    setVoiceError('');
    if (!recognitionRef.current) {
      setVoiceError('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      baseTextRef.current = answerText;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e: any) {
        console.error(e);
        setVoiceError('Could not start microphone session.');
        setIsListening(false);
      }
    }
  };

  const handleClearText = () => {
    baseTextRef.current = '';
    onAnswerChange('');
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-lg">
            Question {index + 1} of {total}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-800 text-slate-300 rounded-md">
            {question.category}
          </span>
        </div>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${
          question.difficulty === 'Hard' ? 'text-rose-400 bg-rose-500/10 border-rose-500/30' :
          question.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
          'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
        }`}>
          {question.difficulty}
        </span>
      </div>

      {/* Question Prompt */}
      <div>
        <h3 className="text-lg font-semibold text-white leading-relaxed flex items-start gap-2.5">
          <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <span>{question.question}</span>
        </h3>
        {question.resumeContext && (
          <div className="mt-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 shrink-0 text-indigo-400" />
            <span><strong>Targeted Context:</strong> {question.resumeContext}</span>
          </div>
        )}
      </div>

      {/* Voice Recording Controls */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-slate-200">Voice Dictation Mode</span>
          </div>

          <div className="flex items-center space-x-2">
            {answerText.length > 0 && (
              <button
                type="button"
                onClick={handleClearText}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all flex items-center space-x-1"
                title="Clear answer text"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleListening}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-600/30'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-indigo-400" />
                  <span>Start Voice Mic</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isListening && (
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center space-x-2 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
            <span className="font-medium">Live Dictation Active — Listening to your speech... Speak clearly into your mic.</span>
          </div>
        )}

        {voiceError && (
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            {voiceError}
          </div>
        )}
      </div>

      {/* Candidate Answer Textarea */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">
          Your Response (Clean Dictation / Text)
        </label>
        <textarea
          value={answerText}
          onChange={(e) => {
            baseTextRef.current = e.target.value;
            onAnswerChange(e.target.value);
          }}
          placeholder="Click 'Start Voice Mic' above to speak your response cleanly, or type manually..."
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm leading-relaxed"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> Speak or type at least 20 words for optimal rubric scoring.
        </span>
        <button
          onClick={onSubmitAnswer}
          disabled={loading || answerText.trim().length < 5}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
        >
          {loading ? (
            <span>Evaluating Answer...</span>
          ) : (
            <>
              <span>Submit & Evaluate Answer</span>
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
