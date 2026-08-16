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
    const { sessionId, answers = [] } = body;

    let totalScore = 0;
    let totalTech = 0;
    let totalComm = 0;
    const strongAreas: string[] = [];
    const weakAreas: string[] = [];

    answers.forEach((ans: any) => {
      const ev = ans.evaluation || {};
      totalScore += ev.overallScore || 75;
      totalTech += (ev.technicalAccuracy || 8) * 10;
      totalComm += (ev.communication || 8) * 10;

      if (ev.strengths) strongAreas.push(...ev.strengths);
      if (ev.weaknesses) weakAreas.push(...ev.weaknesses);
    });

    const count = answers.length || 1;
    const overallScore = Math.round(totalScore / count);
    const technicalScore = Math.round(totalTech / count);
    const communicationScore = Math.round(totalComm / count);
    const problemSolvingScore = Math.round((overallScore + technicalScore) / 2);

    // Calculate Interview Readiness Score
    const readinessScore = Math.min(99, Math.round(overallScore * 0.4 + technicalScore * 0.3 + communicationScore * 0.3));

    let readinessStatus = "NEEDS PREPARATION";
    if (readinessScore >= 85) readinessStatus = "HIGHLY INTERVIEW READY";
    else if (readinessScore >= 75) readinessStatus = "READY WITH IMPROVEMENT";
    else if (readinessScore >= 60) readinessStatus = "MODERATE READINESS";

    const reportDoc = {
      sessionId: sessionId || 'sess-' + Date.now(),
      overallScore,
      technicalScore,
      communicationScore,
      problemSolvingScore,
      readinessScore,
      readinessStatus,
      strongAreas: Array.from(new Set(strongAreas)).slice(0, 5),
      weakAreas: Array.from(new Set(weakAreas)).slice(0, 5),
      recommendedTopics: [
        "System Architecture & Microservices",
        "Performance Optimization & Caching",
        "Edge-case & Error Boundary Handling",
        "STAR Behavioral Framing"
      ],
      completedAt: new Date().toISOString()
    };

    const reportsCol = await getCollection('reports');
    const res = await reportsCol.insertOne(reportDoc);

    const sessionsCol = await getCollection('interviewSessions');
    if (sessionId) {
      await sessionsCol.updateOne({ _id: sessionId }, { $set: { status: 'completed', reportId: res.insertedId.toString() } });
    }

    return buildResponse(200, {
      success: true,
      message: 'Interview session completed',
      data: {
        reportId: res.insertedId.toString(),
        report: reportDoc
      }
    });
  } catch (err: any) {
    console.error("Interview Complete Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Completing interview failed' });
  }
};
