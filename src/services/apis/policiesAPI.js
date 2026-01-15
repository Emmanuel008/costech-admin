import api from '../apiClient';

export const policiesAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/policies/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/policies/ilist');
    const policiesList = response.data.returnData?.list_of_item || [];
    const policy = policiesList.find(p => p.id === id);
    return policy ? { status: 'OK', returnData: policy } : { status: 'ERROR', errorMessage: 'Policy not found' };
  },

  create: async (policyData) => {
    const payload = {
      form_method: 'save',
      title: policyData.title || '',
      date: policyData.date || '',
      document: policyData.document || '',
    };

    const response = await api.post('/api/policies/iformAction', payload);
    return response.data;
  },

  update: async (id, policyData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: policyData.title || '',
      date: policyData.date || '',
      document: policyData.document || null,
    };

    const response = await api.post('/api/policies/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/policies/iformAction', payload);
    return response.data;
  },

};
