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
    const {
      category = 'Technical',
      difficulty = 'Medium',
      count = 5,
      resumeContext = '',
      jobContext = ''
    } = body;

    const systemPrompt = `You are a Technical Interviewer at a top tier technology firm. Generate highly specific, customized interview questions based strictly on the candidate's resume projects/skills and target job requirements.`;
    const userPrompt = `Generate exactly ${count} ${difficulty} level interview questions under the '${category}' category.
Candidate Resume Context:
${resumeContext || 'Full Stack Software Engineer with React, Node.js, MongoDB experience.'}

Target Job Posting Context:
${jobContext || 'Senior Developer needing microservices, cloud, and API optimization.'}

Return JSON array in this format:
[
  {
    "id": "q-1",
    "category": "${category}",
    "difficulty": "${difficulty}",
    "question": "Question text here...",
    "idealAnswerKeyPoints": ["Point 1", "Point 2", "Point 3"],
    "resumeContext": "Reference to candidate resume project or target skill gap"
  }
]`;

    const questionsResult = await callOpenRouterJSON<any[]>(systemPrompt, userPrompt);

    return buildResponse(200, {
      success: true,
      data: {
        category,
        difficulty,
        count: questionsResult.length,
        questions: questionsResult
      }
    });
  } catch (err: any) {
    console.error("Question Generation Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Question generation failed' });
  }
};
