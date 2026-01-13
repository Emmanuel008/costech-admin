import api from '../apiClient';

export const conferenceAPI = {
  getAll: async () => {
    const response = await api.get('/api/conference/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/conference/ilist');
    const conferences = response.data.returnData?.list_of_item || [];
    const conference = conferences.find(c => c.id === id);
    return conference ? { status: 'OK', returnData: conference } : { status: 'ERROR', errorMessage: 'Conference not found' };
  },

  create: async (conferenceData) => {
    const payload = {
      form_method: 'save',
      title: conferenceData.title || '',
      description: conferenceData.description || '',
      image: conferenceData.image || null,
    };

    const response = await api.post('/api/conference/iformAction', payload);
    return response.data;
  },

  update: async (id, conferenceData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: conferenceData.title || '',
      description: conferenceData.description || '',
      image: conferenceData.image || null,
    };

    const response = await api.post('/api/conference/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/conference/iformAction', payload);
    return response.data;
  },

};
