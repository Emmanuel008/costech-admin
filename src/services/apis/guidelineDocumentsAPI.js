import api from '../apiClient';

export const guidelineDocumentsAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/guidelineDocuments/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/guidelineDocuments/ilist');
    const documents = response.data.returnData?.list_of_item || [];
    const document = documents.find(d => d.id === id);
    return document ? { status: 'OK', returnData: document } : { status: 'ERROR', errorMessage: 'Guideline document not found' };
  },

  create: async (documentData) => {
    const payload = {
      form_method: 'save',
      title: documentData.title || '',
      date: documentData.date || '',
      document: documentData.document || null,
    };

    const response = await api.post('/api/guidelineDocuments/iformAction', payload);
    return response.data;
  },

  update: async (id, documentData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: documentData.title || '',
      date: documentData.date || '',
      document: documentData.document || null,
    };

    const response = await api.post('/api/guidelineDocuments/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/guidelineDocuments/iformAction', payload);
    return response.data;
  },

};
