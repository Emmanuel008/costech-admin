import api from '../apiClient';

export const exhibitionAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/exhibition/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/exhibition/ilist');
    const exhibitions = response.data.returnData?.list_of_item || [];
    const exhibition = exhibitions.find(e => e.id === id);
    return exhibition ? { status: 'OK', returnData: exhibition } : { status: 'ERROR', errorMessage: 'Exhibition not found' };
  },

  create: async (exhibitionData) => {
    const payload = {
      form_method: 'save',
      name: exhibitionData.name || '',
      popular_name: exhibitionData.popular_name || '',
      host_institution: exhibitionData.host_institution || '',
      focus: exhibitionData.focus || '',
      tentative_start_date: exhibitionData.tentative_start_date || '',
      tentative_end_date: exhibitionData.tentative_end_date || '',
      location: exhibitionData.location || '',
      link: exhibitionData.link || '',
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

  update: async (id, exhibitionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: exhibitionData.name || '',
      popular_name: exhibitionData.popular_name || '',
      host_institution: exhibitionData.host_institution || '',
      focus: exhibitionData.focus || '',
      tentative_start_date: exhibitionData.tentative_start_date || '',
      tentative_end_date: exhibitionData.tentative_end_date || '',
      location: exhibitionData.location || '',
      link: exhibitionData.link || '',
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

};
