import api from '../apiClient';

export const innovationSpaceAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/innovationspace/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/innovationspace/ilist');
    const spaces = response.data.returnData?.list_of_item || [];
    const space = spaces.find(s => s.id === id);
    return space ? { status: 'OK', returnData: space } : { status: 'ERROR', errorMessage: 'Innovation space not found' };
  },

  create: async (spaceData) => {
    const payload = {
      form_method: 'save',
      name: spaceData.name || '',
      category: spaceData.category || '',
      sector: spaceData.sector || '',
      location: spaceData.location || '',
      latitude: spaceData.latitude || '',
      longitude: spaceData.longitude || '',
      description: spaceData.description || '',
      beneficiary: spaceData.beneficiary || '',
      year_established: spaceData.year_established || '',
      target_audience: spaceData.target_audience || '',
      support_needed: spaceData.support_needed || '',
      collaboration: spaceData.collaboration || '',
      main_challenges: spaceData.main_challenges || '',
      interest_in_training: spaceData.interest_in_training || '',
      area_of_capacity_building: spaceData.area_of_capacity_building || '',
      interest_in_events: spaceData.interest_in_events || '',
      events_focus: spaceData.events_focus || '',
      open_to_partnership: spaceData.open_to_partnership || '',
      partnership_type: spaceData.partnership_type || '',
      contact_person_name: spaceData.contact_person_name || '',
      contact_person_email: spaceData.contact_person_email || '',
      contact_person_phone: spaceData.contact_person_phone || '',
      image: '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (spaceData.image) {
      if (typeof spaceData.image === 'string' && spaceData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = spaceData.image;
      } else if (spaceData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(spaceData.image);
        });
        payload.image = base64;
      }
    }

    const response = await api.post('/api/innovationspace/iformAction', payload);
    return response.data;
  },

  update: async (id, spaceData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: spaceData.name || '',
      category: spaceData.category || '',
      sector: spaceData.sector || '',
      location: spaceData.location || '',
      latitude: spaceData.latitude || '',
      longitude: spaceData.longitude || '',
      description: spaceData.description || '',
      beneficiary: spaceData.beneficiary || '',
      year_established: spaceData.year_established || '',
      target_audience: spaceData.target_audience || '',
      support_needed: spaceData.support_needed || '',
      collaboration: spaceData.collaboration || '',
      main_challenges: spaceData.main_challenges || '',
      interest_in_training: spaceData.interest_in_training || '',
      area_of_capacity_building: spaceData.area_of_capacity_building || '',
      interest_in_events: spaceData.interest_in_events || '',
      events_focus: spaceData.events_focus || '',
      open_to_partnership: spaceData.open_to_partnership || '',
      partnership_type: spaceData.partnership_type || '',
      contact_person_name: spaceData.contact_person_name || '',
      contact_person_email: spaceData.contact_person_email || '',
      contact_person_phone: spaceData.contact_person_phone || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (spaceData.image) {
      if (typeof spaceData.image === 'string' && spaceData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = spaceData.image;
      } else if (spaceData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(spaceData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/innovationspace/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/innovationspace/iformAction', payload);
    return response.data;
  },

};
