import api from '../apiClient';

export const costechVideoAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/costechVideo/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/costechVideo/ilist');
    const videosList = response.data.returnData?.list_of_item || [];
    const video = videosList.find(v => v.id === id);
    return video ? { status: 'OK', returnData: video } : { status: 'ERROR', errorMessage: 'Video not found' };
  },

  create: async (videoData) => {
    const payload = {
      form_method: 'save',
      title: videoData.title || '',
      description: videoData.description || '',
      video_link: videoData.video_link || '',
    };

    const response = await api.post('/api/costechVideo/iformAction', payload);
    return response.data;
  },

  update: async (id, videoData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: videoData.title || '',
      description: videoData.description || '',
      video_link: videoData.video_link || '',
    };

    const response = await api.post('/api/costechVideo/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/costechVideo/iformAction', payload);
    return response.data;
  },

};
