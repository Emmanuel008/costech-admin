import api from '../apiClient';

export const herinInstitutionAPI = {
  getAll: async () => {
    const response = await api.get('/api/herin/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/herin/ilist');
    const institutionsList = response.data.returnData?.list_of_item || [];
    const institution = institutionsList.find(i => i.id === id);
    return institution ? { status: 'OK', returnData: institution } : { status: 'ERROR', errorMessage: 'HERIN Institution not found' };
  },

  create: async (institutionData) => {
    const payload = {
      form_method: 'save',
      name: institutionData.name || institutionData.institution_name || '',
      institution_name: institutionData.institution_name || institutionData.name || '',
      description: institutionData.description || '',
      operation_area: institutionData.operation_area || '',
      region: institutionData.region || '',
      category: institutionData.category || '',
    };

    const response = await api.post('/api/herin/iformAction', payload);
    return response.data;
  },

  update: async (id, institutionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: institutionData.name || institutionData.institution_name || '',
      institution_name: institutionData.institution_name || institutionData.name || '',
      description: institutionData.description || '',
      operation_area: institutionData.operation_area || '',
      region: institutionData.region || '',
      category: institutionData.category || '',
    };

    const response = await api.post('/api/herin/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/herinInstitution/iformAction', payload);
    return response.data;
  },

};
