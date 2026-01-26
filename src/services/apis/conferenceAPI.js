import api from '../apiClient';

export const conferenceAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/conference/ilist', {
      params: { page, limit }
    });
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
      name: conferenceData.name || '',
      abbreviation: conferenceData.abbreviation || '',
      organizer: conferenceData.organizer || '',
      theme: conferenceData.theme || '',
      tentative_start_date: conferenceData.tentative_start_date || '',
      tentative_end_date: conferenceData.tentative_end_date || '',
      location: conferenceData.location || '',
      link: conferenceData.link || '',
    };

    const response = await api.post('/api/conference/iformAction', payload);
    return response.data;
  },

  update: async (id, conferenceData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: conferenceData.name || '',
      abbreviation: conferenceData.abbreviation || '',
      organizer: conferenceData.organizer || '',
      theme: conferenceData.theme || '',
      tentative_start_date: conferenceData.tentative_start_date || '',
      tentative_end_date: conferenceData.tentative_end_date || '',
      location: conferenceData.location || '',
      link: conferenceData.link || '',
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
