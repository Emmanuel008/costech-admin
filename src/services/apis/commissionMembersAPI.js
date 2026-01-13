import api from '../apiClient';

export const commissionMembersAPI = {
  getAll: async () => {
    const response = await api.get('/api/commissionmember/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/commissionmember/ilist');
    const members = response.data.returnData?.list_of_item || [];
    const member = members.find(m => m.id === id);
    return member ? { status: 'OK', returnData: member } : { status: 'ERROR', errorMessage: 'Commission member not found' };
  },

  create: async (memberData) => {
    const payload = {
      form_method: 'save',
      name: memberData.name || '',
      title: memberData.title || '',
      description: memberData.description || '',
      image: '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (memberData.image) {
      if (typeof memberData.image === 'string' && memberData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = memberData.image;
      } else if (memberData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(memberData.image);
        });
        payload.image = base64;
      }
    }

    const response = await api.post('/api/commissionmember/iformAction', payload);
    return response.data;
  },

  update: async (id, memberData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: memberData.name || '',
      title: memberData.title || '',
      description: memberData.description || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (memberData.image) {
      if (typeof memberData.image === 'string' && memberData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = memberData.image;
      } else if (memberData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(memberData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/commissionmember/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/commissionmember/iformAction', payload);
    return response.data;
  },

};
