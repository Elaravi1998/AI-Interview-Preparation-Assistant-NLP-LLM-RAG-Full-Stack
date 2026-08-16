import { Handler } from '@netlify/functions';
import { searchKnowledgeBase } from './_shared/ragEngine';
import { callOpenRouter } from './_shared/openrouter';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { query } = body;

    if (!query || query.trim().length < 2) {
      return buildResponse(400, { success: false, error: 'Please enter a valid study query.' });
    }

    // Step 1: Retrieval stage via serverless term & semantic search
    const ragResults = searchKnowledgeBase(query, 3);

    // Step 2: Context construction
    const contextText = ragResults.map((r, i) => `[Source ${i + 1}: ${r.document.title} (${r.document.topic})]
${r.document.content}
Key Concepts: ${r.document.keyConcepts.join(', ')}`).join('\n\n');

    // Step 3: Synthesis stage via OpenRouter LLM
    const systemPrompt = `You are an expert AI Technical Interview Tutor. Answer the candidate's question clearly, thoroughly, and authoritatively.

Strict Grounding Rule:
Integrate details from the provided retrieved Knowledge Context. Cite source documents clearly using [Source 1], [Source 2], etc.
If the question asks for code examples, provide clean syntax. Format your answer in clean Markdown.`;

    const userPrompt = `Retrieved Knowledge Context:
---
${contextText || 'No direct matching document found in static index.'}
---

Candidate Question: "${query}"`;

    const llmAnswer = await callOpenRouter([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], { temperature: 0.4 });

    const sources = ragResults.map((r, idx) => ({
      sourceId: `Source ${idx + 1}`,
      title: r.document.title,
      topic: r.document.topic,
      category: r.document.category,
      relevanceScore: `${r.relevanceScore}%`,
      keyConcepts: r.document.keyConcepts,
      sampleQuestions: r.document.sampleQuestions
    }));

    return buildResponse(200, {
      success: true,
      data: {
        query,
        answer: llmAnswer,
        sources
      }
    });
  } catch (err: any) {
    console.error("RAG Study Assistant Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Study assistant search failed' });
  }
};
