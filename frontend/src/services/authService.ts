import { request } from './api';

export const authService = {
  async register(name: string, email: string, password: string) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  async login(email: string, password: string) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async getCurrentUser() {
    return request('/auth/me', { method: 'GET' });
  },

  logout() {
    localStorage.removeItem('token');
  }
};
