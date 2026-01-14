import api from '../apiClient';

export const heroesAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/hero/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/hero/ilist');
    const heroesList = response.data.returnData?.list_of_item || [];
    const hero = heroesList.find(h => h.id === id);
    return hero ? { status: 'OK', returnData: hero } : { status: 'ERROR', errorMessage: 'Hero not found' };
  },

  create: async (heroData) => {
    const payload = {
      form_method: 'save',
      name: heroData.name || '',
      title: heroData.title || '',
      tagline: heroData.tagline || '',
      description: heroData.description || '',
      content: heroData.content || '',
      reference: heroData.reference || null,
      image: '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (heroData.image) {
      if (typeof heroData.image === 'string' && heroData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = heroData.image;
      } else if (heroData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(heroData.image);
        });
        payload.image = base64;
      }
    }

    const response = await api.post('/api/hero/iformAction', payload);
    return response.data;
  },

  update: async (id, heroData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : (typeof id === 'number' ? id : parseInt(String(id || '0'), 10)),
      name: heroData.name || '',
      title: heroData.title || '',
      tagline: heroData.tagline || '',
      description: heroData.description || '',
      content: heroData.content || '',
      reference: heroData.reference || null,
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (heroData.image) {
      if (typeof heroData.image === 'string' && heroData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = heroData.image;
      } else if (heroData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(heroData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/hero/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : (typeof id === 'number' ? id : parseInt(String(id || '0'), 10)),
    };

    const response = await api.post('/api/hero/iformAction', payload);
    return response.data;
  },
};
