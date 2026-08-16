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
    const { resumeSkills = [], jobSkills = [] } = body;

    const systemPrompt = `You are a Senior Technical Recruiter & Engineering Director. Conduct a rigorous Skill Gap Analysis comparing candidate skills to job posting expectations.`;
    const userPrompt = `Compare Candidate Skills: [${resumeSkills.join(', ')}]
Against Target Job Requirements: [${jobSkills.join(', ')}]

Return JSON in this exact structure:
{
  "strongSkills": ["React", "Node.js"],
  "moderateSkills": ["AWS"],
  "missingSkills": ["Kubernetes", "Kafka"],
  "recommendations": [
    {
      "skill": "Kafka",
      "whyItMatters": "The job description emphasizes high-throughput event streaming.",
      "topicsToLearn": ["Kafka architecture", "Topics & Partitions", "Consumer Groups & Offsets"],
      "sampleQuestions": ["What is Kafka and how does it guarantee message delivery?"]
    }
  ]
}`;

    const gapResult = await callOpenRouterJSON<any>(systemPrompt, userPrompt);

    return buildResponse(200, {
      success: true,
      data: gapResult
    });
  } catch (err: any) {
    console.error("Skill Gap Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Skill gap analysis failed' });
  }
};
