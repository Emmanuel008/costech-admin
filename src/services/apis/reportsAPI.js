import api from '../apiClient';

export const reportsAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/reports/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/reports/ilist');
    const reportsList = response.data.returnData?.list_of_item || [];
    const report = reportsList.find(r => r.id === id);
    return report ? { status: 'OK', returnData: report } : { status: 'ERROR', errorMessage: 'Report not found' };
  },

  create: async (reportData) => {
    const payload = {
      form_method: 'save',
      title: reportData.title || '',
      date: reportData.date || '',
      document: reportData.document || '',
    };

    const response = await api.post('/api/reports/iformAction', payload);
    return response.data;
  },

  update: async (id, reportData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: reportData.title || '',
      date: reportData.date || '',
      document: reportData.document || null,
    };

    const response = await api.post('/api/reports/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/reports/iformAction', payload);
    return response.data;
  },

};
