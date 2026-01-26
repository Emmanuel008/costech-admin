import api from '../apiClient';

export const footerEresourceAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/footerEresource/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/footerEresource/ilist');
    const resourcesList = response.data.returnData?.list_of_item || [];
    const resource = resourcesList.find(r => r.id === id);
    return resource ? { status: 'OK', returnData: resource } : { status: 'ERROR', errorMessage: 'Footer E-Resource not found' };
  },

  create: async (resourceData) => {
    const payload = {
      form_method: 'save',
      name: resourceData.name || '',
      link: resourceData.link || '',
    };

    const response = await api.post('/api/footerEresource/iformAction', payload);
    return response.data;
  },

  update: async (id, resourceData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: resourceData.name || '',
      link: resourceData.link || '',
    };

    const response = await api.post('/api/footerEresource/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/footerEresource/iformAction', payload);
    return response.data;
  },
};
