import api from '../apiClient';

export const positionAPI = {
  getAll: async () => {
    const response = await api.get('/api/position/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/position/ilist');
    const positions = response.data.returnData?.list_of_item || [];
    const position = positions.find(p => p.id === id);
    return position ? { status: 'OK', returnData: position } : { status: 'ERROR', errorMessage: 'Position not found' };
  },

  create: async (positionData) => {
    const payload = {
      form_method: 'save',
      name: positionData.name || '',
      description: positionData.description || '',
    };

    const response = await api.post('/api/position/iformAction', payload);
    return response.data;
  },

  update: async (id, positionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: positionData.name || '',
      description: positionData.description || '',
    };

    const response = await api.post('/api/position/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/position/iformAction', payload);
    return response.data;
  },

};
