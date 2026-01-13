import api from '../apiClient';

export const directorateAPI = {
  getAll: async () => {
    const response = await api.get('/api/directorate/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/directorate/ilist');
    const directoratesList = response.data.returnData?.list_of_item || [];
    const directorate = directoratesList.find(d => d.id === id);
    return directorate ? { status: 'OK', returnData: directorate } : { status: 'ERROR', errorMessage: 'Directorate not found' };
  },

  create: async (directorateData) => {
    const payload = {
      form_method: 'save',
      name: directorateData.name || '',
      message_from_director: directorateData.message_from_director || '',
      director_name: directorateData.director_name || '',
      service_offered: directorateData.service_offered || [],
      downloads: directorateData.downloads || [],
      document: directorateData.document || '',
    };

    const response = await api.post('/api/directorate/iformAction', payload);
    return response.data;
  },

  update: async (id, directorateData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: directorateData.name || '',
      message_from_director: directorateData.message_from_director || '',
      director_name: directorateData.director_name || '',
      service_offered: directorateData.service_offered || [],
      downloads: directorateData.downloads || [],
      document: directorateData.document || '',
    };

    const response = await api.post('/api/directorate/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/directorate/iformAction', payload);
    return response.data;
  },

};
