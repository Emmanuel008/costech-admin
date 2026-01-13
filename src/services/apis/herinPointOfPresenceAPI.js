import api from '../apiClient';

export const herinPointOfPresenceAPI = {
  getAll: async () => {
    const response = await api.get('/api/herinPointOfPresence/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/herinPointOfPresence/ilist');
    const pointsList = response.data.returnData?.list_of_item || [];
    const point = pointsList.find(p => p.id === id);
    return point ? { status: 'OK', returnData: point } : { status: 'ERROR', errorMessage: 'HERIN Point of Presence not found' };
  },

  create: async (pointData) => {
    const payload = {
      form_method: 'save',
      name: pointData.name || '',
      description: pointData.description || '',
      location: pointData.location || '',
    };

    const response = await api.post('/api/herinPointOfPresence/iformAction', payload);
    return response.data;
  },

  update: async (id, pointData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: pointData.name || '',
      description: pointData.description || '',
      location: pointData.location || '',
    };

    const response = await api.post('/api/herinPointOfPresence/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/herinPointOfPresence/iformAction', payload);
    return response.data;
  },

};
