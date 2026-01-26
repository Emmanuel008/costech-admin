import api from '../apiClient';

export const footerContactUsAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/footerContactUs/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/footerContactUs/ilist');
    const contactsList = response.data.returnData?.list_of_item || [];
    const contact = contactsList.find(c => c.id === id);
    return contact ? { status: 'OK', returnData: contact } : { status: 'ERROR', errorMessage: 'Footer Contact Us not found' };
  },

  create: async (contactData) => {
    const payload = {
      form_method: 'save',
      phone_number: contactData.phone_number || '',
      email: contactData.email || '',
      location: contactData.location || '',
    };

    const response = await api.post('/api/footerContactUs/iformAction', payload);
    return response.data;
  },

  update: async (id, contactData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      phone_number: contactData.phone_number || '',
      email: contactData.email || '',
      location: contactData.location || '',
    };

    const response = await api.post('/api/footerContactUs/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/footerContactUs/iformAction', payload);
    return response.data;
  },
};
