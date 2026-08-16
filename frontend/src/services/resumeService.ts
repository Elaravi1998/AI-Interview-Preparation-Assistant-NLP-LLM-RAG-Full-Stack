import { request } from './api';

export const resumeService = {
  async uploadResume(filename: string, fileData: string, text?: string) {
    return request('/resume/upload', {
      method: 'POST',
      body: JSON.stringify({ filename, fileData, text }),
    });
  },

  async analyzeResume(rawText: string, resumeId?: string) {
    return request('/resume/analyze', {
      method: 'POST',
      body: JSON.stringify({ rawText, resumeId }),
    });
  },

  async analyzeJob(jobText: string) {
    return request('/job/analyze', {
      method: 'POST',
      body: JSON.stringify({ jobText }),
    });
  },

  async matchResumeJob(resumeSkills: string[], jobRequiredSkills: string[], jobPreferredSkills: string[]) {
    return request('/resume-job-match', {
      method: 'POST',
      body: JSON.stringify({ resumeSkills, jobRequiredSkills, jobPreferredSkills }),
    });
  },

  async getSkillGap(resumeSkills: string[], jobSkills: string[]) {
    return request('/skill-gap', {
      method: 'POST',
      body: JSON.stringify({ resumeSkills, jobSkills }),
    });
  },

  async getInterviewPlan(resumeSkills: string[], missingSkills: string[], jobTitle?: string) {
    return request('/interview-plan', {
      method: 'POST',
      body: JSON.stringify({ resumeSkills, missingSkills, jobTitle }),
    });
  }
};
