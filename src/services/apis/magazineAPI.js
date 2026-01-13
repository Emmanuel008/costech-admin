import api from '../apiClient';

export const magazineAPI = {
  getAll: async () => {
    const response = await api.get('/api/magazine/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/magazine/ilist');
    const magazinesList = response.data.returnData?.list_of_item || [];
    const magazine = magazinesList.find(m => m.id === id);
    return magazine ? { status: 'OK', returnData: magazine } : { status: 'ERROR', errorMessage: 'Magazine not found' };
  },

  create: async (magazineData) => {
    const payload = {
      form_method: 'save',
      title: magazineData.title || '',
      date: magazineData.date || '',
      document: magazineData.document || '',
    };

    const response = await api.post('/api/magazine/iformAction', payload);
    return response.data;
  },

  update: async (id, magazineData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: magazineData.title || '',
      date: magazineData.date || '',
      document: magazineData.document || null,
    };

    const response = await api.post('/api/magazine/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/magazine/iformAction', payload);
    return response.data;
  },

};
