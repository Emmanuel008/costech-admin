import api from '../apiClient';

export const onlineServiceAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/onlineService/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/onlineService/ilist');
    const servicesList = response.data.returnData?.list_of_item || [];
    const service = servicesList.find(s => s.id === id);
    return service ? { status: 'OK', returnData: service } : { status: 'ERROR', errorMessage: 'Online service not found' };
  },

  create: async (serviceData) => {
    const payload = {
      form_method: 'save',
      name: serviceData.name || '',
      link: serviceData.link || '',
    };

    const response = await api.post('/api/onlineService/iformAction', payload);
    return response.data;
  },

  update: async (id, serviceData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: serviceData.name || '',
      link: serviceData.link || '',
    };

    const response = await api.post('/api/onlineService/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/onlineService/iformAction', payload);
    return response.data;
  },
};
