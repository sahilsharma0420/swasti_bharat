import api from '@/middlewares/auth.interceptor';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  // Add other registration fields as needed
}

interface YTRequirement {
  _id: string;
  requirement: string;
}

interface YTRule {
  _id: string;
  rule: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Base URLs
const YOGA_CATEGORY_URL = '/admin/mas/y-c';
const SPECIALIZATION_URL = '/admin/mas/specialization';
const YT_REQUIREMENT_URL = '/admin/mas/yTRequirement';
const YT_RULE_URL = '/admin/mas/yTRule';

// Auth Service
export const AuthService = {
  login: async (credentials: LoginCredentials) => {
    return api.post('/auth/login', credentials);
  },
  
  register: async (userData: RegisterData) => {
    return api.post('/auth/register', userData);
  },
  
  logout: async () => {
    return api.post('/auth/logout');
  },
  
  getCurrentUser: async () => {
    return api.get('/auth/me');
  }
};

// Yoga Category Service
export const YogaCategoryService = {
  getAllCategories: async () => {
    try {
      const response = await api.get(YOGA_CATEGORY_URL);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch yoga categories' };
    }
  },

  getCategoryById: async (id: string) => {
    try {
      const response = await api.get(`${YOGA_CATEGORY_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch yoga category' };
    }
  },

  createCategory: async (categoryData: any) => {
    try {
      const response = await api.post(YOGA_CATEGORY_URL, {
        yogaCategory: categoryData.category,
        description: categoryData.description
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to create yoga category' };
    }
  },

  updateCategory: async (id: string, categoryData: any) => {
    try {
      const response = await api.put(`${YOGA_CATEGORY_URL}/${id}`, {
        yogaCategory: categoryData.category,
        description: categoryData.description || ""
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to update yoga category' };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const response = await api.delete(`${YOGA_CATEGORY_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete yoga category' };
    }
  }
};

// Specialization Service
export const SpecializationService = {
  createSpecialization: async (specializationData: any) => {
    try {
      const response = await api.post(SPECIALIZATION_URL, specializationData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to create specialization' };
    }
  },

  getAllSpecializations: async () => {
    try {
      const response = await api.get(SPECIALIZATION_URL);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch specializations' };
    }
  },

  getSpecializationById: async (id: string) => {
    try {
      const response = await api.get(`${SPECIALIZATION_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch specialization' };
    }
  },

  updateSpecialization: async (id: string, specializationData: any) => {
    try {
      const response = await api.put(`${SPECIALIZATION_URL}/${id}`, specializationData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to update specialization' };
    }
  },

  deleteSpecialization: async (id: string) => {
    try {
      const response = await api.delete(`${SPECIALIZATION_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete specialization' };
    }
  }
};

// Yoga Tutor Requirements Service
export const YogaTutorRequirementsService = {
  getAllRequirements: async (): Promise<YTRequirement[]> => {
    try {
      const response = await api.get<ApiResponse<{requirement: YTRequirement[]}>>(YT_REQUIREMENT_URL);
      if (response.data.success && response.data.data) {
        return response.data.data.requirement;
      }
      return [];
    } catch (error) {
      console.error('Error fetching requirements:', error);
      throw error;
    }
  },

  addRequirement: async (requirement: string): Promise<string> => {
    try {
      const response = await api.post<ApiResponse<null>>(YT_REQUIREMENT_URL, { requirement });
      return response.data.message;
    } catch (error) {
      console.error('Error adding requirement:', error);
      throw error;
    }
  },

  updateRequirement: async (id: string, requirement: string): Promise<string> => {
    try {
      const response = await api.put<ApiResponse<null>>(`${YT_REQUIREMENT_URL}/${id}`, { requirement });
      return response.data.message;
    } catch (error) {
      console.error('Error updating requirement:', error);
      throw error;
    }
  },

  deleteRequirement: async (id: string): Promise<string> => {
    try {
      const response = await api.delete<ApiResponse<null>>(`${YT_REQUIREMENT_URL}/${id}`);
      return response.data.message;
    } catch (error) {
      console.error('Error deleting requirement:', error);
      throw error;
    }
  }
};

// Yoga Tutor Rules Service
export const YogaTutorRulesService = {
  getAllRules: async (): Promise<YTRule[]> => {
    try {
      const response = await api.get<ApiResponse<{rule: YTRule[]}>>(YT_RULE_URL);
      if (response.data.success && response.data.data) {
        return response.data.data.rule;
      }
      return [];
    } catch (error) {
      console.error('Error fetching rules:', error);
      throw error;
    }
  },

  addRule: async (rule: string): Promise<string> => {
    try {
      const response = await api.post<ApiResponse<null>>(YT_RULE_URL, { rule });
      return response.data.message;
    } catch (error) {
      console.error('Error adding rule:', error);
      throw error;
    }
  },

  updateRule: async (id: string, rule: string): Promise<string> => {
    try {
      const response = await api.put<ApiResponse<null>>(`${YT_RULE_URL}/${id}`, { rule });
      return response.data.message;
    } catch (error) {
      console.error('Error updating rule:', error);
      throw error;
    }
  },

  deleteRule: async (id: string): Promise<string> => {
    try {
      const response = await api.delete<ApiResponse<null>>(`${YT_RULE_URL}/${id}`);
      return response.data.message;
    } catch (error) {
      console.error('Error deleting rule:', error);
      throw error;
    }
  }
};

// Export types for use in components
export type { LoginCredentials, RegisterData, YTRequirement, YTRule, ApiResponse };