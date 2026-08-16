import { Handler } from '@netlify/functions';
import { callOpenRouterJSON } from './_shared/openrouter';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { question, candidateAnswer, idealAnswerKeyPoints = [] } = body;

    if (!question || !candidateAnswer || candidateAnswer.trim().length < 5) {
      return buildResponse(400, {
        success: false,
        error: 'Please provide a valid response before submitting for evaluation.'
      });
    }

    // Hybrid NLP Keyword & Concept Coverage Calculation
    const lowerAnswer = candidateAnswer.toLowerCase();
    let keywordHits = 0;
    idealAnswerKeyPoints.forEach((kp: string) => {
      const terms = kp.toLowerCase().split(' ');
      if (terms.some(t => t.length > 3 && lowerAnswer.includes(t))) {
        keywordHits++;
      }
    });

    const keywordCoveragePercent = idealAnswerKeyPoints.length > 0
      ? Math.round((keywordHits / idealAnswerKeyPoints.length) * 100)
      : 75;

    const systemPrompt = `You are a Senior Engineering Hiring Manager evaluating a candidate's live interview answer according to a standardized technical rubric. Be objective, thorough, and constructive.`;
    const userPrompt = `Interview Question: "${question}"
Candidate Answer: "${candidateAnswer}"
Expected Key Points: [${idealAnswerKeyPoints.join(', ')}]
NLP Keyword Coverage Score: ${keywordCoveragePercent}%

Evaluate the candidate's answer and return JSON matching this exact structure:
{
  "technicalAccuracy": 8,
  "relevance": 9,
  "completeness": 7,
  "clarity": 8,
  "communication": 8,
  "overallScore": 82,
  "strengths": [
    "Identified core architectural patterns",
    "Clear communication structure"
  ],
  "weaknesses": [
    "Did not mention error handling or memory limits"
  ],
  "improvements": [
    "Elaborate on edge cases and concrete performance benchmarks"
  ],
  "idealAnswer": "A strong model answer would cover..."
}`;

    const evaluation = await callOpenRouterJSON<any>(systemPrompt, userPrompt);

    return buildResponse(200, {
      success: true,
      data: {
        keywordCoveragePercent,
        evaluation
      }
    });
  } catch (err: any) {
    console.error("Answer Evaluation Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Answer evaluation failed' });
  }
};
