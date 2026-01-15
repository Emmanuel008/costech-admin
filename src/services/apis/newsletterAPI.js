import api from '../apiClient';

export const newsletterAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/newsLetter/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/newsLetter/ilist');
    const newslettersList = response.data.returnData?.list_of_item || [];
    const newsletter = newslettersList.find(n => n.id === id);
    return newsletter ? { status: 'OK', returnData: newsletter } : { status: 'ERROR', errorMessage: 'Newsletter not found' };
  },

  create: async (newsletterData) => {
    const payload = {
      form_method: 'save',
      title: newsletterData.title || '',
      date: newsletterData.date || '',
      document: newsletterData.document || '',
      description: '',
      image: '',
    };

    const response = await api.post('/api/newsLetter/iformAction', payload);
    return response.data;
  },

  update: async (id, newsletterData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: newsletterData.title || '',
      date: newsletterData.date || '',
      document: newsletterData.document || null,
      description: '',
      image: '',
    };

    const response = await api.post('/api/newsLetter/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/newsLetter/iformAction', payload);
    return response.data;
  },

};
