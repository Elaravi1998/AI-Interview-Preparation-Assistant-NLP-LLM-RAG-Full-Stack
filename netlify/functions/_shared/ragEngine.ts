import { KNOWLEDGE_BASE, KnowledgeDoc } from '../../../knowledge_base/topics';

export interface RAGSearchResult {
  document: KnowledgeDoc;
  relevanceScore: number;
  snippet: string;
}

export function searchKnowledgeBase(query: string, topK: number = 3): RAGSearchResult[] {
  if (!query || !query.trim()) {
    return [];
  }

  const queryTerms = extractTerms(query);

  const scoredDocs = KNOWLEDGE_BASE.map(doc => {
    const docText = `${doc.topic} ${doc.category} ${doc.title} ${doc.keyConcepts.join(' ')} ${doc.content}`;
    const docTerms = extractTerms(docText);

    let score = 0;

    queryTerms.forEach(term => {
      // Direct topic match boost
      if (doc.topic.toLowerCase().includes(term)) {
        score += 15;
      }
      // Key concepts boost
      if (doc.keyConcepts.some(kc => kc.toLowerCase().includes(term))) {
        score += 8;
      }
      // Content frequency match
      const occurrences = docTerms.filter(t => t === term).length;
      score += occurrences * 2;
    });

    // Normalize by doc length
    const normalizedScore = Math.min(98, Math.round((score / (queryTerms.length || 1)) * 10));

    return {
      document: doc,
      relevanceScore: normalizedScore,
      snippet: doc.content.substring(0, 320) + "..."
    };
  });

  // Filter out non-matching docs & sort descending by score
  return scoredDocs
    .filter(res => res.relevanceScore > 5)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, topK);
}

function extractTerms(text: string): string[] {
  const stopwords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for',
    'with', 'and', 'or', 'of', 'how', 'what', 'why', 'where', 'can', 'you', 'me', 'explain', 'vs'
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopwords.has(word));
}
