import api from '../apiClient';

export const directorateAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/directorate/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/directorate/ilist');
    const directoratesList = response.data.returnData?.list_of_item || [];
    const directorate = directoratesList.find(d => d.id === id);
    return directorate ? { status: 'OK', returnData: directorate } : { status: 'ERROR', errorMessage: 'Directorate not found' };
  },

  create: async (directorateData) => {
    // Process downloads array - ensure each item has name and document
    // Always ensure downloads is an array
    let processedDownloads = [];
    
    if (directorateData.downloads) {
      // Handle different formats: array, string (JSON), or object
      let downloadsArray = [];
      
      if (Array.isArray(directorateData.downloads)) {
        downloadsArray = directorateData.downloads;
      } else if (typeof directorateData.downloads === 'string') {
        try {
          downloadsArray = JSON.parse(directorateData.downloads);
          if (!Array.isArray(downloadsArray)) {
            downloadsArray = [];
          }
        } catch (e) {
          downloadsArray = [];
        }
      } else if (typeof directorateData.downloads === 'object') {
        // If it's a single object, wrap it in an array
        downloadsArray = [directorateData.downloads];
      }
      
      // Process each download to ensure it has name and document
      processedDownloads = downloadsArray.map(download => {
        // Handle both object format and direct properties
        const downloadObj = typeof download === 'object' && download !== null ? download : { name: '', document: '' };
        return {
          name: downloadObj.name || downloadObj.Name || '',
          document: downloadObj.document || downloadObj.Document || downloadObj.image || downloadObj.Image || ''
        };
      });
    }

    // Ensure downloads is always an array with proper structure
    const downloadsArray = Array.isArray(processedDownloads) ? processedDownloads : [];
    
    const payload = {
      form_method: 'save',
      name: directorateData.name || '',
      message_from_director: directorateData.message_from_director || '',
      director_name: directorateData.director_name || '',
      service_offered: Array.isArray(directorateData.service_offered) ? directorateData.service_offered : [],
      downloads: downloadsArray, // Always an array
    };

    // Debug: Log the payload to verify downloads is an array
    console.log('Directorate Create Payload:', JSON.stringify(payload, null, 2));
    console.log('Downloads type:', Array.isArray(payload.downloads) ? 'Array' : typeof payload.downloads);
    console.log('Downloads value:', payload.downloads);

    const response = await api.post('/api/directorate/iformAction', payload);
    return response.data;
  },

  update: async (id, directorateData) => {
    // Process downloads array - ensure each item has name and document
    // Always ensure downloads is an array
    let processedDownloads = [];
    
    if (directorateData.downloads) {
      // Handle different formats: array, string (JSON), or object
      let downloadsArray = [];
      
      if (Array.isArray(directorateData.downloads)) {
        downloadsArray = directorateData.downloads;
      } else if (typeof directorateData.downloads === 'string') {
        try {
          downloadsArray = JSON.parse(directorateData.downloads);
          if (!Array.isArray(downloadsArray)) {
            downloadsArray = [];
          }
        } catch (e) {
          downloadsArray = [];
        }
      } else if (typeof directorateData.downloads === 'object') {
        // If it's a single object, wrap it in an array
        downloadsArray = [directorateData.downloads];
      }
      
      // Process each download to ensure it has name and document
      processedDownloads = downloadsArray.map(download => {
        // Handle both object format and direct properties
        const downloadObj = typeof download === 'object' && download !== null ? download : { name: '', document: '' };
        return {
          name: downloadObj.name || downloadObj.Name || '',
          document: downloadObj.document || downloadObj.Document || downloadObj.image || downloadObj.Image || ''
        };
      });
    }

    // Ensure downloads is always an array with proper structure
    const downloadsArray = Array.isArray(processedDownloads) ? processedDownloads : [];
    
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: directorateData.name || '',
      message_from_director: directorateData.message_from_director || '',
      director_name: directorateData.director_name || '',
      service_offered: Array.isArray(directorateData.service_offered) ? directorateData.service_offered : [],
      downloads: downloadsArray, // Always an array
      document: directorateData.document || '',
    };

    // Debug: Log the payload to verify downloads is an array
    console.log('Directorate Update Payload:', JSON.stringify(payload, null, 2));
    console.log('Downloads type:', Array.isArray(payload.downloads) ? 'Array' : typeof payload.downloads);
    console.log('Downloads value:', payload.downloads);

    const response = await api.post('/api/directorate/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/directorate/iformAction', payload);
    return response.data;
  },

};
