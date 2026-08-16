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
    const { rawText, resumeId } = body;

    let textToAnalyze = rawText;
    if (!textToAnalyze && resumeId) {
      const resumesCol = await getCollection('resumes');
      const doc = await resumesCol.findOne({ _id: resumeId });
      if (doc) textToAnalyze = doc.rawText;
    }

    if (!textToAnalyze || textToAnalyze.trim().length < 20) {
      return buildResponse(400, { success: false, error: 'Resume text is required for analysis' });
    }

    const systemPrompt = `You are an expert NLP Resume Parser & HR Talent Assessor. Analyze the candidate's raw resume text and output structured JSON.`;
    const userPrompt = `Extract structured details from this resume:
---
${textToAnalyze}
---

Return JSON in this exact structure:
{
  "personalInfo": { "name": "", "email": "", "phone": "", "location": "" },
  "experience": [
    { "jobTitle": "", "company": "", "years": "", "responsibilities": "" }
  ],
  "skills": {
    "technical": ["React", "Node.js", "Python", ...],
    "soft": ["Communication", "Leadership", ...]
  },
  "education": [
    { "degree": "", "institution": "", "year": "" }
  ],
  "projects": [
    { "name": "", "technologies": [], "description": "" }
  ]
}`;

    const analysisResult = await callOpenRouterJSON<any>(systemPrompt, userPrompt);

    const analysesCol = await getCollection('analyses');
    const record = {
      userId,
      resumeId: resumeId || 'res-' + Date.now(),
      rawText: textToAnalyze,
      parsedData: analysisResult,
      analyzedAt: new Date().toISOString()
    };

    const res = await analysesCol.insertOne(record);

    return buildResponse(200, {
      success: true,
      message: 'Resume NLP analysis completed successfully',
      data: {
        analysisId: res.insertedId.toString(),
        parsedData: analysisResult
      }
    });
  } catch (err: any) {
    console.error("Resume Analysis Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Resume analysis failed' });
  }
};
