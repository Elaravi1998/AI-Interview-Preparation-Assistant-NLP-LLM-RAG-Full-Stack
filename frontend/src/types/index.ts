export interface User {
  id: string;
  email: string;
  name: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  years: string;
  responsibilities: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  name: string;
  technologies: string[];
  description: string;
}

export interface ParsedResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  skills: {
    technical: string[];
    soft: string[];
  };
  education: Education[];
  projects: Project[];
}

export interface ParsedJobData {
  jobTitle: string;
  company: string;
  requiredSkills: string[];
  preferredSkills: string[];
  softSkills: string[];
  experience: string;
  responsibilities: string[];
}

export interface ResumeJobMatch {
  overallMatch: number;
  matchedSkills: string[];
  missingSkills: string[];
  partialMatchSkills: string[];
  methodology: string;
}

export interface SkillGapRecommendation {
  skill: string;
  whyItMatters: string;
  topicsToLearn: string[];
  sampleQuestions: string[];
}

export interface SkillGapAnalysis {
  strongSkills: string[];
  moderateSkills: string[];
  missingSkills: string[];
  recommendations: SkillGapRecommendation[];
}

export interface PlanDay {
  day: number;
  topic: string;
  focus: string;
  tasks: string[];
}

export interface InterviewPlanData {
  role: string;
  plan: PlanDay[];
}

export interface Question {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  idealAnswerKeyPoints: string[];
  resumeContext?: string;
}

export interface AnswerEvaluation {
  technicalAccuracy: number;
  relevance: number;
  completeness: number;
  clarity: number;
  communication: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  idealAnswer: string;
}

export interface AnswerRecord {
  questionId: string;
  question: string;
  candidateAnswer: string;
  evaluation?: AnswerEvaluation;
}

export interface InterviewReportData {
  sessionId: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  readinessScore: number;
  readinessStatus: string;
  strongAreas: string[];
  weakAreas: string[];
  recommendedTopics: string[];
  completedAt: string;
}

export interface RAGSource {
  sourceId: string;
  title: string;
  topic: string;
  category: string;
  relevanceScore: string;
  keyConcepts: string[];
  sampleQuestions: string[];
}

export interface RAGStudyResponse {
  query: string;
  answer: string;
  sources: RAGSource[];
}
