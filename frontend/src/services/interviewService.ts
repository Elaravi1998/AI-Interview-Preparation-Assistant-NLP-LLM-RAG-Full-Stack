import { request } from './api';

export const interviewService = {
  async generateQuestions(params: {
    category: string;
    difficulty: string;
    count: number;
    resumeContext?: string;
    jobContext?: string;
  }) {
    return request('/questions/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  async startInterview(mode: string, difficulty: string, questions: any[]) {
    return request('/interview/start', {
      method: 'POST',
      body: JSON.stringify({ mode, difficulty, questions }),
    });
  },

  async evaluateAnswer(question: string, candidateAnswer: string, idealAnswerKeyPoints: string[]) {
    return request('/answer/evaluate', {
      method: 'POST',
      body: JSON.stringify({ question, candidateAnswer, idealAnswerKeyPoints }),
    });
  },

  async saveAnswer(sessionId: string, questionId: string, question: string, candidateAnswer: string, evaluation: any) {
    return request('/interview/answer', {
      method: 'POST',
      body: JSON.stringify({ sessionId, questionId, question, candidateAnswer, evaluation }),
    });
  },

  async completeInterview(sessionId: string, answers: any[]) {
    return request('/interview/complete', {
      method: 'POST',
      body: JSON.stringify({ sessionId, answers }),
    });
  }
};
