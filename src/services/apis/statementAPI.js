import api from '../apiClient';

export const statementAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/statement/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/statement/ilist');
    const statementsList = response.data.returnData?.list_of_item || [];
    const statement = statementsList.find(s => s.id === id);
    return statement ? { status: 'OK', returnData: statement } : { status: 'ERROR', errorMessage: 'Statement not found' };
  },

  create: async (statementData) => {
    const payload = {
      form_method: 'save',
      title: statementData.title || '',
      description: statementData.description || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (statementData.image) {
      if (typeof statementData.image === 'string' && statementData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = statementData.image;
      } else if (statementData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(statementData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/statement/iformAction', payload);
    return response.data;
  },

  update: async (id, statementData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: statementData.title || '',
      description: statementData.description || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (statementData.image) {
      if (typeof statementData.image === 'string' && statementData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = statementData.image;
      } else if (statementData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(statementData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/statement/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/statement/iformAction', payload);
    return response.data;
  },

};
