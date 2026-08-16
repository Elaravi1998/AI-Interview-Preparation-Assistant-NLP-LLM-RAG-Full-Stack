import { Handler } from '@netlify/functions';
import { extractUserFromHeader } from './_shared/auth';
import { getCollection } from './_shared/mongodb';
import { callOpenRouterJSON } from './_shared/openrouter';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  const decoded = extractUserFromHeader(event.headers);
  const userId = decoded ? decoded.userId : 'guest-' + Date.now();

  try {
    const body = JSON.parse(event.body || '{}');
    const { jobText } = body;

    if (!jobText || jobText.trim().length < 20) {
      return buildResponse(400, { success: false, error: 'Job description text is required' });
    }

    const systemPrompt = `You are an expert NLP Job Description Analyst. Analyze the target job posting text and extract structured technical and domain requirements.`;
    const userPrompt = `Extract structured details from this Job Description:
---
${jobText}
---

Return JSON in this exact structure:
{
  "jobTitle": "Full Stack Engineer",
  "company": "Tech Target Corp",
  "requiredSkills": ["React", "Node.js", "MongoDB", "SQL"],
  "preferredSkills": ["AWS", "Docker", "Kubernetes", "Kafka"],
  "softSkills": ["Communication", "Problem Solving", "Team Leadership"],
  "experience": "3+ years",
  "responsibilities": [
    "Build resilient React dashboards",
    "Develop scalable REST/GraphQL backend microservices"
  ]
}`;

    const parsedJobData = await callOpenRouterJSON<any>(systemPrompt, userPrompt);

    const jdCol = await getCollection('jobDescriptions');
    const record = {
      userId,
      rawText: jobText,
      parsedData: parsedJobData,
      createdAt: new Date().toISOString()
    };

    const res = await jdCol.insertOne(record);

    return buildResponse(200, {
      success: true,
      message: 'Job Description NLP analysis completed',
      data: {
        jobId: res.insertedId.toString(),
        parsedData: parsedJobData
      }
    });
  } catch (err: any) {
    console.error("Job Analysis Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Job analysis failed' });
  }
};
