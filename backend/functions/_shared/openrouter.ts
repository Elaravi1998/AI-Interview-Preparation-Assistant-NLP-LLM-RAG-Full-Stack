export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterOptions {
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' };
}

export async function callOpenRouter(
  messages: OpenRouterMessage[],
  options: OpenRouterOptions = {}
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4.1-mini';

  if (!apiKey || apiKey.includes('your-openrouter-key')) {
    console.warn("OPENROUTER_API_KEY is not set. Utilizing rule-based fallback generation.");
    return generateFallbackResponse(messages);
  }

  try {
    const payload: any = {
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 2000,
    };

    if (options.response_format) {
      payload.response_format = options.response_format;
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://ai-interview-assistant.netlify.app',
        'X-Title': 'AI Interview Preparation Assistant',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenRouter API HTTP Error [${response.status}]:`, errorText);
      throw new Error(`OpenRouter API failed with status ${response.status}`);
    }

    const data = await response.json();
    const messageContent = data.choices?.[0]?.message?.content;

    if (!messageContent) {
      throw new Error("Empty message response from OpenRouter API");
    }

    return messageContent;
  } catch (error) {
    console.error("OpenRouter Execution Error:", error);
    return generateFallbackResponse(messages);
  }
}

export async function callOpenRouterJSON<T = any>(
  systemPrompt: string,
  userPrompt: string
): Promise<T> {
  const messages: OpenRouterMessage[] = [
    { role: 'system', content: `${systemPrompt}\n\nIMPORTANT: You MUST respond ONLY with valid JSON. Do not include markdown code block formatting like \`\`\`json.` },
    { role: 'user', content: userPrompt }
  ];

  const rawResult = await callOpenRouter(messages, {
    temperature: 0.3,
    response_format: { type: 'json_object' }
  });

  try {
    const cleaned = rawResult
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    return JSON.parse(cleaned) as T;
  } catch (parseErr) {
    console.error("JSON Parse Error. Raw LLM Output was:", rawResult);
    const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]) as T;
      } catch (e) {
        // continue
      }
    }
    throw new Error("Failed to parse JSON response from LLM");
  }
}

function generateFallbackResponse(messages: OpenRouterMessage[]): string {
  const promptText = messages.map(m => m.content).join("\n");

  if (promptText.toLowerCase().includes("resume analysis") || promptText.toLowerCase().includes("extract resume")) {
    return JSON.stringify({
      personalInfo: {
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA"
      },
      experience: [
        {
          jobTitle: "Senior Full Stack Engineer",
          company: "TechNova Solutions",
          years: "3.5 years",
          responsibilities: "Designed microservices, built React dashboards, implemented MongoDB aggregations and Kafka pipelines."
        }
      ],
      skills: {
        technical: ["React", "Node.js", "TypeScript", "MongoDB", "SQL", "AWS", "Docker", "Python", "Kafka", "REST APIs"],
        soft: ["Problem Solving", "Communication", "Teamwork", "Agile Leadership"]
      },
      education: [
        {
          degree: "B.S. Computer Science",
          institution: "University of California, Berkeley",
          year: "2020"
        }
      ],
      projects: [
        {
          name: "E-Commerce Real-time Analytics Engine",
          technologies: ["React", "Node.js", "Kafka", "MongoDB"],
          description: "Built high-throughput streaming dashboard handling 50k events per second."
        }
      ]
    });
  }

  if (promptText.toLowerCase().includes("job description") || promptText.toLowerCase().includes("analyze job")) {
    return JSON.stringify({
      jobTitle: "Senior Full Stack AI Developer",
      company: "Innovate AI",
      requiredSkills: ["React", "Node.js", "TypeScript", "MongoDB", "Python", "Docker", "AWS"],
      preferredSkills: ["Kubernetes", "Kafka", "LLMs", "RAG", "LangChain"],
      softSkills: ["Problem Solving", "Cross-team Collaboration", "Communication"],
      experience: "3+ years",
      responsibilities: [
        "Architect scalable React web applications with serverless API backends.",
        "Implement RAG workflows with vector indexing and OpenRouter LLMs."
      ]
    });
  }

  if (promptText.toLowerCase().includes("skill gap") || promptText.toLowerCase().includes("gap analysis")) {
    return JSON.stringify({
      strongSkills: ["React", "Node.js", "MongoDB", "TypeScript", "REST APIs"],
      moderateSkills: ["AWS", "Docker", "Python"],
      missingSkills: ["Kubernetes", "Kafka", "LLMs", "RAG"],
      recommendations: [
        {
          skill: "Kubernetes",
          whyItMatters: "The job description mentions microservices container orchestration.",
          topicsToLearn: ["Control Plane Architecture", "Deployments vs StatefulSets", "Ingress Controllers"],
          sampleQuestions: ["What is the difference between Deployment and StatefulSet in K8s?"]
        }
      ]
    });
  }

  if (promptText.toLowerCase().includes("evaluate")) {
    return JSON.stringify({
      technicalAccuracy: 8,
      relevance: 9,
      completeness: 8,
      clarity: 8,
      communication: 8,
      overallScore: 83,
      strengths: ["Clear technical articulation", "Structured trade-off explanation"],
      weaknesses: ["Could mention specific monitoring metrics"],
      improvements: ["Include p99 latency figures and error boundary patterns"],
      idealAnswer: "A complete response covers architectural decisions, indexing, error handling, and concrete metric results."
    });
  }

  return JSON.stringify({
    response: "This is a fallback response. Provide a valid OPENROUTER_API_KEY in Netlify environment variables for live LLM completions."
  });
}
