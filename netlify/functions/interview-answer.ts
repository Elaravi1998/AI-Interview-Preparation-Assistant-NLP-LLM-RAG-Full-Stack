import { Handler } from '@netlify/functions';
import { getCollection } from './_shared/mongodb';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { sessionId, questionId, question, candidateAnswer, evaluation } = body;

    const sessionsCol = await getCollection('interviewSessions');
    const session = await sessionsCol.findOne({ _id: sessionId });

    const answerRecord = {
      questionId,
      question,
      candidateAnswer,
      evaluation,
      answeredAt: new Date().toISOString()
    };

    if (session) {
      const updatedAnswers = [...(session.answers || []), answerRecord];
      await sessionsCol.updateOne({ _id: sessionId }, { $set: { answers: updatedAnswers } });
    }

    return buildResponse(200, {
      success: true,
      data: { answerRecord }
    });
  } catch (err: any) {
    console.error("Save Answer Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Saving answer failed' });
  }
};
