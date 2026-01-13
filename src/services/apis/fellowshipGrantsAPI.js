import api from '../apiClient';

export const fellowshipGrantsAPI = {
  getAll: async () => {
    const response = await api.get('/api/fellowshipGrants/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/fellowshipGrants/ilist');
    const grants = response.data.returnData?.list_of_item || [];
    const grant = grants.find(g => g.id === id);
    return grant ? { status: 'OK', returnData: grant } : { status: 'ERROR', errorMessage: 'Fellowship grant not found' };
  },

  create: async (grantData) => {
    const payload = {
      form_method: 'save',
      title: grantData.title || '',
      description: grantData.description || '',
      link: grantData.link || '',
      status: grantData.status || 'OPEN',
    };

    const response = await api.post('/api/fellowshipGrants/iformAction', payload);
    return response.data;
  },

  update: async (id, grantData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: grantData.title || '',
      description: grantData.description || '',
      link: grantData.link || '',
      status: grantData.status || 'OPEN',
    };

    const response = await api.post('/api/fellowshipGrants/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/fellowshipGrants/iformAction', payload);
    return response.data;
  },

};
