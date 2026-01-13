import api from '../apiClient';

export const communityEngagementAPI = {
  getAll: async () => {
    const response = await api.get('/api/communityEngagement/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/communityEngagement/ilist');
    const engagementsList = response.data.returnData?.list_of_item || [];
    const engagement = engagementsList.find(e => e.id === id);
    return engagement ? { status: 'OK', returnData: engagement } : { status: 'ERROR', errorMessage: 'Community engagement not found' };
  },

  create: async (engagementData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = engagementData.date || new Date().toISOString().split('T')[0];
    if (formattedDate && formattedDate.includes('/')) {
      // Convert DD/MM/YYYY to YYYY-MM-DD if needed
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const payload = {
      form_method: 'save',
      title: engagementData.title || '',
      date: formattedDate,
      description: engagementData.description || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (engagementData.image) {
      if (typeof engagementData.image === 'string' && engagementData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = engagementData.image;
      } else if (engagementData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(engagementData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/communityEngagement/iformAction', payload);
    return response.data;
  },

  update: async (id, engagementData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = engagementData.date || new Date().toISOString().split('T')[0];
    if (formattedDate && formattedDate.includes('/')) {
      // Convert DD/MM/YYYY to YYYY-MM-DD if needed
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: engagementData.title || '',
      date: formattedDate,
      description: engagementData.description || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (engagementData.image) {
      if (typeof engagementData.image === 'string' && engagementData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = engagementData.image;
      } else if (engagementData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(engagementData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/communityEngagement/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/communityEngagement/iformAction', payload);
    return response.data;
  },

};
