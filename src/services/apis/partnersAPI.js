import api from '../apiClient';

export const partnersAPI = {
  getAll: async () => {
    const response = await api.get('/api/partners/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/partners/ilist');
    const partnersList = response.data.returnData?.list_of_item || [];
    const partner = partnersList.find(p => p.id === id);
    return partner ? { status: 'OK', returnData: partner } : { status: 'ERROR', errorMessage: 'Partner not found' };
  },

  create: async (partnerData) => {
    const payload = {
      form_method: 'save',
      name: partnerData.name || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (partnerData.image) {
      if (typeof partnerData.image === 'string' && partnerData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = partnerData.image;
      } else if (partnerData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(partnerData.image);
        });
        payload.image = base64;
      }
    }

    const response = await api.post('/api/partners/iformAction', payload);
    return response.data;
  },

  update: async (id, partnerData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: partnerData.name || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (partnerData.image) {
      if (typeof partnerData.image === 'string' && partnerData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = partnerData.image;
      } else if (partnerData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(partnerData.image);
        });
        payload.image = base64;
      }
    }

    const response = await api.post('/api/partners/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/partners/iformAction', payload);
    return response.data;
  },

};
