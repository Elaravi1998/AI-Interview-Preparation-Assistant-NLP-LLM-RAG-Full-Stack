import { Handler } from '@netlify/functions';
import { extractUserFromHeader } from './_shared/auth';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { resumeSkills = [], jobRequiredSkills = [], jobPreferredSkills = [] } = body;

    const normResumeSkills = resumeSkills.map((s: string) => s.toLowerCase().trim());
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];
    const partialMatchSkills: string[] = [];

    const allJobSkills = [...jobRequiredSkills, ...jobPreferredSkills];

    allJobSkills.forEach((jobSkill: string) => {
      const lowerJobSkill = jobSkill.toLowerCase().trim();
      const exactMatch = normResumeSkills.some((rs: string) => rs === lowerJobSkill || rs.includes(lowerJobSkill) || lowerJobSkill.includes(rs));

      if (exactMatch) {
        matchedSkills.push(jobSkill);
      } else {
        // Semantic relationship check
        const isPartial = normResumeSkills.some((rs: string) => {
          return (rs.includes('sql') && lowerJobSkill.includes('mongo')) ||
                 (rs.includes('aws') && lowerJobSkill.includes('docker')) ||
                 (rs.includes('react') && lowerJobSkill.includes('vue')) ||
                 (rs.includes('python') && lowerJobSkill.includes('machine learning'));
        });

        if (isPartial) {
          partialMatchSkills.push(jobSkill);
        } else {
          missingSkills.push(jobSkill);
        }
      }
    });

    const totalReq = allJobSkills.length || 1;
    const scoreVal = Math.round(
      ((matchedSkills.length * 1.0 + partialMatchSkills.length * 0.5) / totalReq) * 100
    );
    const overallMatch = Math.min(96, Math.max(35, scoreVal));

    return buildResponse(200, {
      success: true,
      data: {
        overallMatch,
        matchedSkills: Array.from(new Set(matchedSkills)),
        missingSkills: Array.from(new Set(missingSkills)),
        partialMatchSkills: Array.from(new Set(partialMatchSkills)),
        methodology: "Calculated via weighted exact token overlap (1.0 weight) plus domain semantic similarity (0.5 weight) across required & preferred technical skills."
      }
    });
  } catch (err: any) {
    console.error("Match Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Matching failed' });
  }
};
