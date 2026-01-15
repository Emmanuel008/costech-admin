import api from '../apiClient';

export const faqCategoryAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/faqCategory/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/faqCategory/ilist');
    const categoriesList = response.data.returnData?.list_of_item || [];
    const category = categoriesList.find(c => c.id === id);
    return category ? { status: 'OK', returnData: category } : { status: 'ERROR', errorMessage: 'FAQ Category not found' };
  },

  create: async (categoryData) => {
    const payload = {
      form_method: 'save',
      name: categoryData.name || '',
      description: categoryData.description || '',
    };

    const response = await api.post('/api/faqCategory/iformAction', payload);
    return response.data;
  },

  update: async (id, categoryData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: categoryData.name || '',
      description: categoryData.description || '',
    };

    const response = await api.post('/api/faqCategory/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/faqCategory/iformAction', payload);
    return response.data;
  },
};
