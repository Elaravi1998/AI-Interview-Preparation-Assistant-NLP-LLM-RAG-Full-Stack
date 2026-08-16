import { request } from './api';

export const reportService = {
  async getReport(reportId?: string) {
    const query = reportId ? `?id=${reportId}` : '';
    return request(`/interview/report${query}`, { method: 'GET' });
  },

  async queryStudyAssistant(query: string) {
    return request('/study-assistant', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }
};
