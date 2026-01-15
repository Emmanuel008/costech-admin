import api from '../apiClient';

export const faqAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/faq/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/faq/ilist');
    const faqsList = response.data.returnData?.list_of_item || [];
    const faq = faqsList.find(f => f.id === id);
    return faq ? { status: 'OK', returnData: faq } : { status: 'ERROR', errorMessage: 'FAQ not found' };
  },

  create: async (faqData) => {
    const payload = {
      form_method: 'save',
      faq_category_id: faqData.faq_category_id || null,
      question: faqData.question || '',
      answer: faqData.answer || '',
    };

    const response = await api.post('/api/faq/iformAction', payload);
    return response.data;
  },

  update: async (id, faqData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      faq_category_id: faqData.faq_category_id || null,
      question: faqData.question || '',
      answer: faqData.answer || '',
    };

    const response = await api.post('/api/faq/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/faq/iformAction', payload);
    return response.data;
  },
};
