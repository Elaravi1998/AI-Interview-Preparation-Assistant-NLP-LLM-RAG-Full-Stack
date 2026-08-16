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
    const { resumeSkills = [], missingSkills = [], jobTitle = 'Full Stack Developer' } = body;

    const systemPrompt = `You are a Principal Engineering Lead creating a 7-Day Personalized Interview Preparation Plan.`;
    const userPrompt = `Create a 7-day preparation study plan for a ${jobTitle} role.
Candidate Known Skills: ${resumeSkills.join(', ')}
Candidate Missing/Gap Skills: ${missingSkills.join(', ')}

Return JSON in this format:
{
  "role": "${jobTitle}",
  "plan": [
    { "day": 1, "topic": "Core Language & Fundamentals", "focus": "JavaScript event loop, closure & async", "tasks": ["Task 1", "Task 2"] },
    { "day": 2, "topic": "Frontend Mastery", "focus": "React Fiber & performance optimization", "tasks": ["Task 1", "Task 2"] },
    { "day": 3, "topic": "Backend Architecture", "focus": "Node.js non-blocking I/O & REST API design", "tasks": ["Task 1", "Task 2"] },
    { "day": 4, "topic": "Databases & Indexing", "focus": "MongoDB aggregation & SQL ACID transactions", "tasks": ["Task 1", "Task 2"] },
    { "day": 5, "topic": "System Design", "focus": "Load balancing, caching & microservices", "tasks": ["Task 1", "Task 2"] },
    { "day": 6, "topic": "Cloud & DevOps Gaps", "focus": "Docker containerization & K8s deployments", "tasks": ["Task 1", "Task 2"] },
    { "day": 7, "topic": "Mock Interview & Final Prep", "focus": "Simulated interview session & STAR behavioral responses", "tasks": ["Task 1", "Task 2"] }
  ]
}`;

    const planResult = await callOpenRouterJSON<any>(systemPrompt, userPrompt);

    return buildResponse(200, {
      success: true,
      data: planResult
    });
  } catch (err: any) {
    console.error("Plan Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Interview plan creation failed' });
  }
};
