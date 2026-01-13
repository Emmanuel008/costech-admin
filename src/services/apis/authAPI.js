import api from '../apiClient';

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.get('/api/auth/logout');
    return response.data;
  },
};
