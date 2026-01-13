import api from '../apiClient';

export const sectionsAPI = {
  getAll: async () => {
    const response = await api.get('/api/section/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/section/ilist`);
    const sections = response.data.returnData?.list_of_item || [];
    const section = sections.find(s => s.id === id);
    return section ? { status: 'OK', returnData: section } : { status: 'ERROR', errorMessage: 'Section not found' };
  },

  create: async (sectionData) => {
    const payload = {
      form_method: 'save',
      name: sectionData.title || sectionData.name,
      description: sectionData.description || '',
    };
    
    // Add content if provided
    if (sectionData.content) {
      payload.content = sectionData.content;
    }

    const response = await api.post('/api/section/iformAction', payload);
    return response.data;
  },

  update: async (id, sectionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: sectionData.title || sectionData.name,
      description: sectionData.description || '',
    };
    
    // Add content if provided
    if (sectionData.content) {
      payload.content = sectionData.content;
    }

    const response = await api.post('/api/section/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/section/iformAction', payload);
    return response.data;
  },

  toggleVisibility: async (id, isVisible) => {
    const response = await api.patch(`/api/sections/${id}/visibility`, {
      isVisible,
    });
    return response.data;
  },
};
