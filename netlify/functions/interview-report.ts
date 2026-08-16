import { Handler } from '@netlify/functions';
import { getCollection } from './_shared/mongodb';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const reportId = event.queryStringParameters?.id;
    const reportsCol = await getCollection('reports');

    let report: any = null;

    if (reportId) {
      report = await reportsCol.findOne({ _id: reportId });
    }

    if (!report) {
      // Return latest report or default report
      const list = await reportsCol.find({}).sort({ completedAt: -1 }).limit(1).toArray();
      report = list[0];
    }

    if (!report) {
      report = {
        sessionId: 'demo-session',
        overallScore: 82,
        technicalScore: 78,
        communicationScore: 81,
        problemSolvingScore: 84,
        readinessScore: 79,
        readinessStatus: "READY WITH IMPROVEMENT",
        strongAreas: [
          "React Virtual DOM & Fiber reconciliation",
          "Node.js streams & asynchronous event loop",
          "Clear, structured technical delivery"
        ],
        weakAreas: [
          "Deep Kubernetes deployment specifications",
          "Distributed cache invalidation edge cases"
        ],
        recommendedTopics: [
          "Kafka Partition & Offset Management",
          "Kubernetes StatefulSets vs Deployments",
          "Redis Cache-Aside Pattern",
          "STAR Behavioral Framework"
        ],
        completedAt: new Date().toISOString()
      };
    }

    return buildResponse(200, {
      success: true,
      data: report
    });
  } catch (err: any) {
    console.error("Report Fetch Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Fetching report failed' });
  }
};
