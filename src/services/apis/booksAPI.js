import api from '../apiClient';

export const booksAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/books/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/books/ilist');
    const booksList = response.data.returnData?.list_of_item || [];
    const book = booksList.find(b => b.id === id);
    return book ? { status: 'OK', returnData: book } : { status: 'ERROR', errorMessage: 'Book not found' };
  },

  create: async (bookData) => {
    const payload = {
      form_method: 'save',
      title: bookData.title || '',
      date: bookData.date || '',
      document: bookData.document || '',
    };

    const response = await api.post('/api/books/iformAction', payload);
    return response.data;
  },

  update: async (id, bookData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: bookData.title || '',
      date: bookData.date || '',
      document: bookData.document || null,
    };

    const response = await api.post('/api/books/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/books/iformAction', payload);
    return response.data;
  },

};
