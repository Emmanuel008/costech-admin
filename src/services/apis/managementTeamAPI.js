import api from '../apiClient';

export const managementTeamAPI = {
  getAll: async () => {
    const response = await api.get('/api/managementteam/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/managementteam/ilist');
    const teamMembers = response.data.returnData?.list_of_item || [];
    const member = teamMembers.find(m => m.id === id);
    return member ? { status: 'OK', returnData: member } : { status: 'ERROR', errorMessage: 'Team member not found' };
  },

  create: async (memberData) => {
    const payload = {
      form_method: 'save',
      name: memberData.name || '',
      position_id: memberData.position_id || null,
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

    const response = await api.post('/api/managementteam/iformAction', payload);
    return response.data;
  },

  update: async (id, memberData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: memberData.name || '',
      position_id: memberData.position_id || null,
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

    const response = await api.post('/api/managementteam/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/managementteam/iformAction', payload);
    return response.data;
  },

};
