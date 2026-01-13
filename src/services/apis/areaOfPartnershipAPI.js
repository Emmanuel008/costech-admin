import api from '../apiClient';

export const areaOfPartnershipAPI = {
  getAll: async () => {
    const response = await api.get('/api/areaOfPartnership/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/areaOfPartnership/ilist');
    const areas = response.data.returnData?.list_of_item || [];
    const area = areas.find(a => a.id === id);
    return area ? { status: 'OK', returnData: area } : { status: 'ERROR', errorMessage: 'Area of partnership not found' };
  },

  create: async (areaData) => {
    const payload = {
      form_method: 'save',
      title: areaData.title || '',
      description: areaData.description || '',
    };

    const response = await api.post('/api/areaOfPartnership/iformAction', payload);
    return response.data;
  },

  update: async (id, areaData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: areaData.title || '',
      description: areaData.description || '',
    };

    const response = await api.post('/api/areaOfPartnership/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/areaOfPartnership/iformAction', payload);
    return response.data;
  },

};
