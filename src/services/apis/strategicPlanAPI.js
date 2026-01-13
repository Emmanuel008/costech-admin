import api from '../apiClient';

export const strategicPlanAPI = {
  getAll: async () => {
    const response = await api.get('/api/strategicPlan/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/strategicPlan/ilist');
    const plansList = response.data.returnData?.list_of_item || [];
    const plan = plansList.find(p => p.id === id);
    return plan ? { status: 'OK', returnData: plan } : { status: 'ERROR', errorMessage: 'Strategic Plan not found' };
  },

  create: async (planData) => {
    const payload = {
      form_method: 'save',
      title: planData.title || '',
      date: planData.date || '',
      document: planData.document || '',
    };

    const response = await api.post('/api/strategicPlan/iformAction', payload);
    return response.data;
  },

  update: async (id, planData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: planData.title || '',
      date: planData.date || '',
      document: planData.document || null,
    };

    const response = await api.post('/api/strategicPlan/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/strategicPlan/iformAction', payload);
    return response.data;
  },

};
