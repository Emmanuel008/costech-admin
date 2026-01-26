import api from '../apiClient';

export const footerQuickLinkAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/footerQuickLink/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/footerQuickLink/ilist');
    const linksList = response.data.returnData?.list_of_item || [];
    const link = linksList.find(l => l.id === id);
    return link ? { status: 'OK', returnData: link } : { status: 'ERROR', errorMessage: 'Footer Quick Link not found' };
  },

  create: async (linkData) => {
    const payload = {
      form_method: 'save',
      name: linkData.name || '',
      link: linkData.link || '',
    };

    const response = await api.post('/api/footerQuickLink/iformAction', payload);
    return response.data;
  },

  update: async (id, linkData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: linkData.name || '',
      link: linkData.link || '',
    };

    const response = await api.post('/api/footerQuickLink/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/footerQuickLink/iformAction', payload);
    return response.data;
  },
};
