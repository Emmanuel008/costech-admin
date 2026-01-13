import api from '../apiClient';

export const newsAPI = {
  getAll: async () => {
    const response = await api.get('/api/news/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/news/ilist');
    const newsList = response.data.returnData?.list_of_item || [];
    const news = newsList.find(n => n.id === id);
    return news ? { status: 'OK', returnData: news } : { status: 'ERROR', errorMessage: 'News not found' };
  },

  create: async (newsData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = newsData.date || new Date().toISOString().split('T')[0];
    if (formattedDate && formattedDate.includes('/')) {
      // Convert DD/MM/YYYY to YYYY-MM-DD if needed
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const payload = {
      form_method: 'save',
      date: formattedDate,
      title: newsData.title || '',
      description: newsData.description || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (newsData.image) {
      if (typeof newsData.image === 'string' && newsData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = newsData.image;
      } else if (newsData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(newsData.image);
        });
        payload.image = base64;
      }
    }

    const response = await api.post('/api/news/iformAction', payload);
    return response.data;
  },

  update: async (id, newsData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = newsData.date || new Date().toISOString().split('T')[0];
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
      date: formattedDate,
      title: newsData.title || '',
      description: newsData.description || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (newsData.image) {
      if (typeof newsData.image === 'string' && newsData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = newsData.image;
      } else if (newsData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(newsData.image);
        });
        payload.image = base64;
      }
    }

    const response = await api.post('/api/news/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/news/iformAction', payload);
    return response.data;
  },
};
