import api from '../apiClient';

export const ongoingProjectAPI = {
  getAll: async () => {
    const response = await api.get('/api/ongoingProject/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/ongoingProject/ilist');
    const projects = response.data.returnData?.list_of_item || [];
    const project = projects.find(p => p.id === id);
    return project ? { status: 'OK', returnData: project } : { status: 'ERROR', errorMessage: 'Ongoing project not found' };
  },

  create: async (projectData) => {
    const payload = {
      form_method: 'save',
      title: projectData.title || '',
      description: projectData.description || '',
      image: projectData.image || null,
    };

    const response = await api.post('/api/ongoingProject/iformAction', payload);
    return response.data;
  },

  update: async (id, projectData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: projectData.title || '',
      description: projectData.description || '',
      image: projectData.image || null,
    };

    const response = await api.post('/api/ongoingProject/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/ongoingProject/iformAction', payload);
    return response.data;
  },

};
