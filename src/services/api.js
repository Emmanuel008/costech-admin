import axios from 'axios';

const API_BASE_URL = 'https://costech.kingdomsolutions.co.tz';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add access token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.get('/api/auth/logout');
    return response.data;
  },
};

// Sections API
export const sectionsAPI = {
  getAll: async () => {
    const response = await api.get('/api/section/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/section/ilist`);
    const sections = response.data.returnData?.list_of_item || [];
    const section = sections.find(s => s.id === id);
    return section ? { status: 'OK', returnData: section } : { status: 'ERROR', errorMessage: 'Section not found' };
  },

  create: async (sectionData) => {
    const payload = {
      form_method: 'save',
      name: sectionData.title || sectionData.name,
      description: sectionData.description || '',
    };
    
    // Add content if provided
    if (sectionData.content) {
      payload.content = sectionData.content;
    }

    const response = await api.post('/api/section/iformAction', payload);
    return response.data;
  },

  update: async (id, sectionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: sectionData.title || sectionData.name,
      description: sectionData.description || '',
    };
    
    // Add content if provided
    if (sectionData.content) {
      payload.content = sectionData.content;
    }

    const response = await api.post('/api/section/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/section/iformAction', payload);
    return response.data;
  },

  toggleVisibility: async (id, isVisible) => {
    const response = await api.patch(`/api/sections/${id}/visibility`, {
      isVisible,
    });
    return response.data;
  },
};

// News API
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

// Partners API
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

// Heroes API
export const heroesAPI = {
  getAll: async () => {
    const response = await api.get('/api/hero/ilist');
    return response.data;
  },

  getById: async (uuid) => {
    const response = await api.get('/api/hero/ilist');
    const heroesList = response.data.returnData?.list_of_item || [];
    const hero = heroesList.find(h => h.uuid === uuid);
    return hero ? { status: 'OK', returnData: hero } : { status: 'ERROR', errorMessage: 'Hero not found' };
  },

  create: async (heroData) => {
    const payload = {
      form_method: 'save',
      name: heroData.name || '',
      description: heroData.description || '',
      title: heroData.title || '',
      tagline: heroData.tagline || '',
      content: heroData.content || '',
      preference: heroData.preference || null,
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

  update: async (uuid, heroData) => {
    const payload = {
      form_method: 'update',
      uuid: uuid || '',
      name: heroData.name || '',
      description: heroData.description || '',
      title: heroData.title || '',
      tagline: heroData.tagline || '',
      content: heroData.content || '',
      preference: heroData.preference || null,
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

  delete: async (uuid) => {
    const payload = {
      form_method: 'delete',
      id: uuid || '',
    };

    const response = await api.post('/api/hero/iformAction', payload);
    return response.data;
  },
};

// Position API
export const positionAPI = {
  getAll: async () => {
    const response = await api.get('/api/position/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/position/ilist');
    const positions = response.data.returnData?.list_of_item || [];
    const position = positions.find(p => p.id === id);
    return position ? { status: 'OK', returnData: position } : { status: 'ERROR', errorMessage: 'Position not found' };
  },

  create: async (positionData) => {
    const payload = {
      form_method: 'save',
      name: positionData.name || '',
      description: positionData.description || '',
    };

    const response = await api.post('/api/position/iformAction', payload);
    return response.data;
  },

  update: async (id, positionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: positionData.name || '',
      description: positionData.description || '',
    };

    const response = await api.post('/api/position/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/position/iformAction', payload);
    return response.data;
  },
};

// Management Team API
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

// Commission Members API
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

// Innovation Space API
export const innovationSpaceAPI = {
  getAll: async () => {
    const response = await api.get('/api/innovationspace/ilist');
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

// Online Service API
export const onlineServiceAPI = {
  getAll: async () => {
    const response = await api.get('/api/onlineService/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/onlineService/ilist');
    const servicesList = response.data.returnData?.list_of_item || [];
    const service = servicesList.find(s => s.id === id);
    return service ? { status: 'OK', returnData: service } : { status: 'ERROR', errorMessage: 'Online service not found' };
  },

  create: async (serviceData) => {
    const payload = {
      form_method: 'save',
      name: serviceData.name || '',
      link: serviceData.link || '',
    };

    const response = await api.post('/api/onlineService/iformAction', payload);
    return response.data;
  },

  update: async (id, serviceData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: serviceData.name || '',
      link: serviceData.link || '',
    };

    const response = await api.post('/api/onlineService/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/onlineService/iformAction', payload);
    return response.data;
  },
};

// Financial Report API
export const financialReportAPI = {
  getAll: async () => {
    const response = await api.get('/api/financialReport/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/financialReport/ilist');
    const reportsList = response.data.returnData?.list_of_item || [];
    const report = reportsList.find(r => r.id === id);
    return report ? { status: 'OK', returnData: report } : { status: 'ERROR', errorMessage: 'Financial report not found' };
  },

  create: async (reportData) => {
    const payload = {
      form_method: 'save',
      title: reportData.title || '',
      description: reportData.description || '',
      document: reportData.document || '',
    };

    const response = await api.post('/api/financialReport/iformAction', payload);
    return response.data;
  },

  update: async (id, reportData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: reportData.title || '',
      description: reportData.description || '',
      document: reportData.document || null,
    };

    const response = await api.post('/api/financialReport/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/financialReport/iformAction', payload);
    return response.data;
  },
};

// Magazine API
export const magazineAPI = {
  getAll: async () => {
    const response = await api.get('/api/magazine/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/magazine/ilist');
    const magazinesList = response.data.returnData?.list_of_item || [];
    const magazine = magazinesList.find(m => m.id === id);
    return magazine ? { status: 'OK', returnData: magazine } : { status: 'ERROR', errorMessage: 'Magazine not found' };
  },

  create: async (magazineData) => {
    const payload = {
      form_method: 'save',
      title: magazineData.title || '',
      date: magazineData.date || '',
      document: magazineData.document || '',
    };

    const response = await api.post('/api/magazine/iformAction', payload);
    return response.data;
  },

  update: async (id, magazineData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: magazineData.title || '',
      date: magazineData.date || '',
      document: magazineData.document || null,
    };

    const response = await api.post('/api/magazine/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/magazine/iformAction', payload);
    return response.data;
  },
};

// Books API
export const booksAPI = {
  getAll: async () => {
    const response = await api.get('/api/books/ilist');
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

// Reports API
export const reportsAPI = {
  getAll: async () => {
    const response = await api.get('/api/reports/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/reports/ilist');
    const reportsList = response.data.returnData?.list_of_item || [];
    const report = reportsList.find(r => r.id === id);
    return report ? { status: 'OK', returnData: report } : { status: 'ERROR', errorMessage: 'Report not found' };
  },

  create: async (reportData) => {
    const payload = {
      form_method: 'save',
      title: reportData.title || '',
      date: reportData.date || '',
      document: reportData.document || '',
    };

    const response = await api.post('/api/reports/iformAction', payload);
    return response.data;
  },

  update: async (id, reportData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: reportData.title || '',
      date: reportData.date || '',
      document: reportData.document || null,
    };

    const response = await api.post('/api/reports/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/reports/iformAction', payload);
    return response.data;
  },
};

// Acts and Legal API
export const actsAndLegalAPI = {
  getAll: async () => {
    const response = await api.get('/api/actsandlegal/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/actsandlegal/ilist');
    const actsList = response.data.returnData?.list_of_item || [];
    const act = actsList.find(a => a.id === id);
    return act ? { status: 'OK', returnData: act } : { status: 'ERROR', errorMessage: 'Act and Legal not found' };
  },

  create: async (actData) => {
    const payload = {
      form_method: 'save',
      title: actData.title || '',
      date: actData.date || '',
      document: actData.document || '',
    };

    const response = await api.post('/api/actsandlegal/iformAction', payload);
    return response.data;
  },

  update: async (id, actData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: actData.title || '',
      date: actData.date || '',
      document: actData.document || null,
    };

    const response = await api.post('/api/actsandlegal/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/actsandlegal/iformAction', payload);
    return response.data;
  },
};

// Policies API
export const policiesAPI = {
  getAll: async () => {
    const response = await api.get('/api/policies/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/policies/ilist');
    const policiesList = response.data.returnData?.list_of_item || [];
    const policy = policiesList.find(p => p.id === id);
    return policy ? { status: 'OK', returnData: policy } : { status: 'ERROR', errorMessage: 'Policy not found' };
  },

  create: async (policyData) => {
    const payload = {
      form_method: 'save',
      title: policyData.title || '',
      date: policyData.date || '',
      document: policyData.document || '',
    };

    const response = await api.post('/api/policies/iformAction', payload);
    return response.data;
  },

  update: async (id, policyData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: policyData.title || '',
      date: policyData.date || '',
      document: policyData.document || null,
    };

    const response = await api.post('/api/policies/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/policies/iformAction', payload);
    return response.data;
  },
};

// Strategic Plan API
export const strategicPlanAPI = {
  getAll: async () => {
    const response = await api.get('/api/strategicPlan/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/strategicPlan/ilist');
    const plansList = response.data.returnData?.list_of_item || [];
    const plan = plansList.find(p => p.id === id);
    return plan ? { status: 'OK', returnData: plan } : { status: 'ERROR', errorMessage: 'Strategic Plan not found' };
  },

  create: async (planData) => {
    const payload = {
      form_method: 'save',
      title: planData.title || '',
      date: planData.date || '',
      document: planData.document || '',
    };

    const response = await api.post('/api/strategicPlan/iformAction', payload);
    return response.data;
  },

  update: async (id, planData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: planData.title || '',
      date: planData.date || '',
      document: planData.document || null,
    };

    const response = await api.post('/api/strategicPlan/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/strategicPlan/iformAction', payload);
    return response.data;
  },
};

export const guidelineDocumentsAPI = {
  getAll: async () => {
    const response = await api.get('/api/guidelineDocuments/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/guidelineDocuments/ilist');
    const documents = response.data.returnData?.list_of_item || [];
    const document = documents.find(d => d.id === id);
    return document ? { status: 'OK', returnData: document } : { status: 'ERROR', errorMessage: 'Guideline document not found' };
  },

  create: async (documentData) => {
    const payload = {
      form_method: 'save',
      title: documentData.title || '',
      date: documentData.date || '',
      document: documentData.document || null,
    };

    const response = await api.post('/api/guidelineDocuments/iformAction', payload);
    return response.data;
  },

  update: async (id, documentData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: documentData.title || '',
      date: documentData.date || '',
      document: documentData.document || null,
    };

    const response = await api.post('/api/guidelineDocuments/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/guidelineDocuments/iformAction', payload);
    return response.data;
  },
};

export const conferenceAPI = {
  getAll: async () => {
    const response = await api.get('/api/conference/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/conference/ilist');
    const conferences = response.data.returnData?.list_of_item || [];
    const conference = conferences.find(c => c.id === id);
    return conference ? { status: 'OK', returnData: conference } : { status: 'ERROR', errorMessage: 'Conference not found' };
  },

  create: async (conferenceData) => {
    const payload = {
      form_method: 'save',
      title: conferenceData.title || '',
      description: conferenceData.description || '',
      image: conferenceData.image || null,
    };

    const response = await api.post('/api/conference/iformAction', payload);
    return response.data;
  },

  update: async (id, conferenceData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: conferenceData.title || '',
      description: conferenceData.description || '',
      image: conferenceData.image || null,
    };

    const response = await api.post('/api/conference/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/conference/iformAction', payload);
    return response.data;
  },
};

export const exhibitionAPI = {
  getAll: async () => {
    const response = await api.get('/api/exhibition/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/exhibition/ilist');
    const exhibitions = response.data.returnData?.list_of_item || [];
    const exhibition = exhibitions.find(e => e.id === id);
    return exhibition ? { status: 'OK', returnData: exhibition } : { status: 'ERROR', errorMessage: 'Exhibition not found' };
  },

  create: async (exhibitionData) => {
    const payload = {
      form_method: 'save',
      title: exhibitionData.title || '',
      date: exhibitionData.date || '',
      image: exhibitionData.image || null,
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

  update: async (id, exhibitionData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: exhibitionData.title || '',
      date: exhibitionData.date || '',
      image: exhibitionData.image || null,
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/exhibition/iformAction', payload);
    return response.data;
  },
};

export const ongoingProjectAPI = {
  getAll: async () => {
    const response = await api.get('/api/ongoingProject/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/ongoingProject/ilist');
    const projects = response.data.returnData?.list_of_item || [];
    const project = projects.find(p => p.id === id);
    return project ? { status: 'OK', returnData: project } : { status: 'ERROR', errorMessage: 'Ongoing project not found' };
  },

  create: async (projectData) => {
    const payload = {
      form_method: 'save',
      title: projectData.title || '',
      description: projectData.description || '',
      image: projectData.image || null,
    };

    const response = await api.post('/api/ongoingProject/iformAction', payload);
    return response.data;
  },

  update: async (id, projectData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: projectData.title || '',
      description: projectData.description || '',
      image: projectData.image || null,
    };

    const response = await api.post('/api/ongoingProject/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/ongoingProject/iformAction', payload);
    return response.data;
  },
};

export const areaOfPartnershipAPI = {
  getAll: async () => {
    const response = await api.get('/api/areaOfPartnership/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/areaOfPartnership/ilist');
    const areas = response.data.returnData?.list_of_item || [];
    const area = areas.find(a => a.id === id);
    return area ? { status: 'OK', returnData: area } : { status: 'ERROR', errorMessage: 'Area of partnership not found' };
  },

  create: async (areaData) => {
    const payload = {
      form_method: 'save',
      title: areaData.title || '',
      description: areaData.description || '',
    };

    const response = await api.post('/api/areaOfPartnership/iformAction', payload);
    return response.data;
  },

  update: async (id, areaData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: areaData.title || '',
      description: areaData.description || '',
    };

    const response = await api.post('/api/areaOfPartnership/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/areaOfPartnership/iformAction', payload);
    return response.data;
  },
};

export const fellowshipGrantsAPI = {
  getAll: async () => {
    const response = await api.get('/api/fellowshipGrants/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/fellowshipGrants/ilist');
    const grants = response.data.returnData?.list_of_item || [];
    const grant = grants.find(g => g.id === id);
    return grant ? { status: 'OK', returnData: grant } : { status: 'ERROR', errorMessage: 'Fellowship grant not found' };
  },

  create: async (grantData) => {
    const payload = {
      form_method: 'save',
      title: grantData.title || '',
      description: grantData.description || '',
      link: grantData.link || '',
      status: grantData.status || 'OPEN',
    };

    const response = await api.post('/api/fellowshipGrants/iformAction', payload);
    return response.data;
  },

  update: async (id, grantData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: grantData.title || '',
      description: grantData.description || '',
      link: grantData.link || '',
      status: grantData.status || 'OPEN',
    };

    const response = await api.post('/api/fellowshipGrants/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/fellowshipGrants/iformAction', payload);
    return response.data;
  },
};

// Press Release API
export const pressReleaseAPI = {
  getAll: async () => {
    const response = await api.get('/api/pressRelease/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/pressRelease/ilist');
    const pressReleasesList = response.data.returnData?.list_of_item || [];
    const pressRelease = pressReleasesList.find(pr => pr.id === id);
    return pressRelease ? { status: 'OK', returnData: pressRelease } : { status: 'ERROR', errorMessage: 'Press release not found' };
  },

  create: async (pressReleaseData) => {
    const payload = {
      form_method: 'save',
      title: pressReleaseData.title || '',
      description: pressReleaseData.description || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (pressReleaseData.image) {
      if (typeof pressReleaseData.image === 'string' && pressReleaseData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = pressReleaseData.image;
      } else if (pressReleaseData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(pressReleaseData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/pressRelease/iformAction', payload);
    return response.data;
  },

  update: async (id, pressReleaseData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: pressReleaseData.title || '',
      description: pressReleaseData.description || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (pressReleaseData.image) {
      if (typeof pressReleaseData.image === 'string' && pressReleaseData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = pressReleaseData.image;
      } else if (pressReleaseData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(pressReleaseData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/pressRelease/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/pressRelease/iformAction', payload);
    return response.data;
  },
};

// Statement API
export const statementAPI = {
  getAll: async () => {
    const response = await api.get('/api/statement/ilist');
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

// Costech Video API
export const costechVideoAPI = {
  getAll: async () => {
    const response = await api.get('/api/costechVideo/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/costechVideo/ilist');
    const videosList = response.data.returnData?.list_of_item || [];
    const video = videosList.find(v => v.id === id);
    return video ? { status: 'OK', returnData: video } : { status: 'ERROR', errorMessage: 'Video not found' };
  },

  create: async (videoData) => {
    const payload = {
      form_method: 'save',
      title: videoData.title || '',
      description: videoData.description || '',
      video_link: videoData.video_link || '',
    };

    const response = await api.post('/api/costechVideo/iformAction', payload);
    return response.data;
  },

  update: async (id, videoData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: videoData.title || '',
      description: videoData.description || '',
      video_link: videoData.video_link || '',
    };

    const response = await api.post('/api/costechVideo/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/costechVideo/iformAction', payload);
    return response.data;
  },
};

// Community Engagement API
export const communityEngagementAPI = {
  getAll: async () => {
    const response = await api.get('/api/communityEngagement/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/communityEngagement/ilist');
    const engagementsList = response.data.returnData?.list_of_item || [];
    const engagement = engagementsList.find(e => e.id === id);
    return engagement ? { status: 'OK', returnData: engagement } : { status: 'ERROR', errorMessage: 'Community engagement not found' };
  },

  create: async (engagementData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = engagementData.date || new Date().toISOString().split('T')[0];
    if (formattedDate && formattedDate.includes('/')) {
      // Convert DD/MM/YYYY to YYYY-MM-DD if needed
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const payload = {
      form_method: 'save',
      title: engagementData.title || '',
      date: formattedDate,
      description: engagementData.description || '',
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (engagementData.image) {
      if (typeof engagementData.image === 'string' && engagementData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = engagementData.image;
      } else if (engagementData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(engagementData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/communityEngagement/iformAction', payload);
    return response.data;
  },

  update: async (id, engagementData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = engagementData.date || new Date().toISOString().split('T')[0];
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
      title: engagementData.title || '',
      date: formattedDate,
      description: engagementData.description || '',
      image: null, // Default to null for updates
    };
    
    // Add image if provided (convert file to base64 data URL)
    if (engagementData.image) {
      if (typeof engagementData.image === 'string' && engagementData.image.startsWith('data:')) {
        // Already a data URL
        payload.image = engagementData.image;
      } else if (engagementData.image instanceof File) {
        // Convert file to base64 data URL
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(engagementData.image);
        });
        payload.image = base64;
      }
    } else {
      payload.image = '';
    }

    const response = await api.post('/api/communityEngagement/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/communityEngagement/iformAction', payload);
    return response.data;
  },
};

// Newsletter API
export const newsletterAPI = {
  getAll: async () => {
    const response = await api.get('/api/newsLetter/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/newsLetter/ilist');
    const newslettersList = response.data.returnData?.list_of_item || [];
    const newsletter = newslettersList.find(n => n.id === id);
    return newsletter ? { status: 'OK', returnData: newsletter } : { status: 'ERROR', errorMessage: 'Newsletter not found' };
  },

  create: async (newsletterData) => {
    const payload = {
      form_method: 'save',
      title: newsletterData.title || '',
      date: newsletterData.date || '',
      document: newsletterData.document || '',
      description: '',
      image: '',
    };

    const response = await api.post('/api/newsLetter/iformAction', payload);
    return response.data;
  },

  update: async (id, newsletterData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: newsletterData.title || '',
      date: newsletterData.date || '',
      document: newsletterData.document || null,
      description: '',
      image: '',
    };

    const response = await api.post('/api/newsLetter/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/newsLetter/iformAction', payload);
    return response.data;
  },
};

// HERIN Institution API
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

// HERIN Point of Presence API
export const herinPointOfPresenceAPI = {
  getAll: async () => {
    const response = await api.get('/api/herinPointOfPresence/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/herinPointOfPresence/ilist');
    const pointsList = response.data.returnData?.list_of_item || [];
    const point = pointsList.find(p => p.id === id);
    return point ? { status: 'OK', returnData: point } : { status: 'ERROR', errorMessage: 'HERIN Point of Presence not found' };
  },

  create: async (pointData) => {
    const payload = {
      form_method: 'save',
      name: pointData.name || '',
      description: pointData.description || '',
      location: pointData.location || '',
    };

    const response = await api.post('/api/herinPointOfPresence/iformAction', payload);
    return response.data;
  },

  update: async (id, pointData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: pointData.name || '',
      description: pointData.description || '',
      location: pointData.location || '',
    };

    const response = await api.post('/api/herinPointOfPresence/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/herinPointOfPresence/iformAction', payload);
    return response.data;
  },
};

// Directorate API
export const directorateAPI = {
  getAll: async () => {
    const response = await api.get('/api/directorate/ilist');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/directorate/ilist');
    const directoratesList = response.data.returnData?.list_of_item || [];
    const directorate = directoratesList.find(d => d.id === id);
    return directorate ? { status: 'OK', returnData: directorate } : { status: 'ERROR', errorMessage: 'Directorate not found' };
  },

  create: async (directorateData) => {
    const payload = {
      form_method: 'save',
      name: directorateData.name || '',
      message_from_director: directorateData.message_from_director || '',
      director_name: directorateData.director_name || '',
      service_offered: directorateData.service_offered || [],
      downloads: directorateData.downloads || [],
      document: directorateData.document || '',
    };

    const response = await api.post('/api/directorate/iformAction', payload);
    return response.data;
  },

  update: async (id, directorateData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      name: directorateData.name || '',
      message_from_director: directorateData.message_from_director || '',
      director_name: directorateData.director_name || '',
      service_offered: directorateData.service_offered || [],
      downloads: directorateData.downloads || [],
      document: directorateData.document || '',
    };

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

export default api;

