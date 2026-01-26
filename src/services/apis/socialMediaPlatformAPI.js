import api from '../apiClient';

export const socialMediaPlatformAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/socialMediaPlatform/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/socialMediaPlatform/ilist');
    const platformsList = response.data.returnData?.list_of_item || [];
    const platform = platformsList.find(p => p.id === id);
    return platform ? { status: 'OK', returnData: platform } : { status: 'ERROR', errorMessage: 'Social Media Platform not found' };
  },

  create: async (platformData) => {
    const payload = {
      form_method: 'save',
      icon: null, // Default to null
      link: platformData.link || '',
    };
    
    // Add icon if provided (base64 data URL)
    if (platformData.icon) {
      if (typeof platformData.icon === 'string' && platformData.icon.startsWith('data:')) {
        // Already a base64 data URL
        payload.icon = platformData.icon;
      } else if (platformData.icon instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(platformData.icon);
        });
        payload.icon = base64;
      }
    }

    const response = await api.post('/api/socialMediaPlatform/iformAction', payload);
    return response.data;
  },

  update: async (id, platformData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      icon: null, // Default to null for updates
      link: platformData.link || '',
    };
    
    // Add icon if provided (base64 data URL)
    if (platformData.icon) {
      if (typeof platformData.icon === 'string' && platformData.icon.startsWith('data:')) {
        // Already a base64 data URL
        payload.icon = platformData.icon;
      } else if (platformData.icon instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(platformData.icon);
        });
        payload.icon = base64;
      }
    }

    const response = await api.post('/api/socialMediaPlatform/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/socialMediaPlatform/iformAction', payload);
    return response.data;
  },
};
