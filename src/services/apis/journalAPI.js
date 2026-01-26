import api from '../apiClient';

export const journalAPI = {
  getAll: async (page = 1, limit = 10) => {
    try {
      const response = await api.get('/api/journal/ilist', {
        params: { page, limit }
      });
      return response.data;
    } catch (err) {
      // If endpoint returns 404, return empty structure
      if (err.response?.status === 404) {
        return {
          status: 'OK',
          errorMessage: 'List of Item',
          returnData: { list_of_item: [], total: 0 }
        };
      }
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get('/api/journal/ilist');
      const journalsList = response.data.returnData?.list_of_item || [];
      const journal = journalsList.find(j => j.id === id);
      return journal ? { status: 'OK', returnData: journal } : { status: 'ERROR', errorMessage: 'Journal not found' };
    } catch (err) {
      if (err.response?.status === 404) {
        return { status: 'ERROR', errorMessage: 'Journal not found' };
      }
      throw err;
    }
  },

  create: async (journalData) => {
    const payload = {
      form_method: 'save',
      issn: journalData.issn || '',
      title: journalData.title || '',
      publisher: journalData.publisher || '',
      mode: journalData.mode || '',
      frequency: journalData.frequency || '',
      subject: journalData.subject || '',
      url: journalData.url || '',
      language: journalData.language || '',
      indexed: journalData.indexed || '',
      university: journalData.university || '',
    };

    const response = await api.post('/api/journal/iformAction', payload);
    return response.data;
  },

  update: async (id, journalData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      issn: journalData.issn || '',
      title: journalData.title || '',
      publisher: journalData.publisher || '',
      mode: journalData.mode || '',
      frequency: journalData.frequency || '',
      subject: journalData.subject || '',
      url: journalData.url || '',
      language: journalData.language || '',
      indexed: journalData.indexed || '',
      university: journalData.university || '',
    };

    const response = await api.post('/api/journal/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/journal/iformAction', payload);
    return response.data;
  },
};
