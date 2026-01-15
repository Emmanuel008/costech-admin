import api from '../apiClient';

export const actsAndLegalAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/actsandlegal/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/actsandlegal/ilist');
    const actsList = response.data.returnData?.list_of_item || [];
    const act = actsList.find(a => a.id === id);
    return act ? { status: 'OK', returnData: act } : { status: 'ERROR', errorMessage: 'Act and Legal not found' };
  },

  create: async (actData) => {
    const payload = {
      form_method: 'save',
      title: actData.title || '',
      date: actData.date || '',
      document: actData.document || '',
    };

    const response = await api.post('/api/actsandlegal/iformAction', payload);
    return response.data;
  },

  update: async (id, actData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: actData.title || '',
      date: actData.date || '',
      document: actData.document || null,
    };

    const response = await api.post('/api/actsandlegal/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/actsandlegal/iformAction', payload);
    return response.data;
  },

};
