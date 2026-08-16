import { Handler } from '@netlify/functions';
import { extractUserFromHeader } from './_shared/auth';
import { getCollection } from './_shared/mongodb';
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
    const { mode = 'Technical', difficulty = 'Medium', questions = [] } = body;

    const sessionDoc = {
      userId,
      mode,
      difficulty,
      questions,
      answers: [],
      evaluations: [],
      status: 'in-progress',
      startedAt: new Date().toISOString()
    };

    const sessionsCol = await getCollection('interviewSessions');
    const res = await sessionsCol.insertOne(sessionDoc);

    return buildResponse(201, {
      success: true,
      data: {
        sessionId: res.insertedId.toString(),
        session: sessionDoc
      }
    });
  } catch (err: any) {
    console.error("Interview Start Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Starting interview failed' });
  }
};
