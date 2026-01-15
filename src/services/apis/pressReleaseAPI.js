import api from '../apiClient';

export const pressReleaseAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/pressRelease/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/pressRelease/ilist');
    const pressReleasesList = response.data.returnData?.list_of_item || [];
    const pressRelease = pressReleasesList.find(pr => pr.id === id);
    return pressRelease ? { status: 'OK', returnData: pressRelease } : { status: 'ERROR', errorMessage: 'Press release not found' };
  },

  create: async (pressReleaseData) => {
    const payload = {
      form_method: 'save',
      title: pressReleaseData.title || '',
      description: pressReleaseData.description || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (pressReleaseData.image) {
      if (typeof pressReleaseData.image === 'string' && pressReleaseData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = pressReleaseData.image;
      } else if (pressReleaseData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(pressReleaseData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/pressRelease/iformAction', payload);
    return response.data;
  },

  update: async (id, pressReleaseData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: pressReleaseData.title || '',
      description: pressReleaseData.description || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (pressReleaseData.image) {
      if (typeof pressReleaseData.image === 'string' && pressReleaseData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = pressReleaseData.image;
      } else if (pressReleaseData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(pressReleaseData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/pressRelease/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/pressRelease/iformAction', payload);
    return response.data;
  },

};
