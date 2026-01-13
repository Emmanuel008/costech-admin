import api from '../apiClient';

export const exhibitionAPI = {
  getAll: async () => {
    const response = await api.get('/api/exhibition/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/exhibition/ilist');
    const exhibitions = response.data.returnData?.list_of_item || [];
    const exhibition = exhibitions.find(e => e.id === id);
    return exhibition ? { status: 'OK', returnData: exhibition } : { status: 'ERROR', errorMessage: 'Exhibition not found' };
  },

  create: async (exhibitionData) => {
    const payload = {
      form_method: 'save',
      title: exhibitionData.title || '',
      date: exhibitionData.date || '',
      image: exhibitionData.image || null,
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

  update: async (id, exhibitionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: exhibitionData.title || '',
      date: exhibitionData.date || '',
      image: exhibitionData.image || null,
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

};
