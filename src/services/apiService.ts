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

interface YogaCategory {
  _id: string;
  yogaCategory: string;
  description: string;
}

interface DateOfClass {
  date: string;
  meetingLink: string | null;
  day?: string;
  classDatesTimeInUTC?: string;
}

interface YogaClass {
  _id: string;
  modeOfClass: string;
  classType: string;
  time: string;
  description: string;
  timeDurationInMin: number;
  numberOfSeats: number;
  numberOfClass: number;
  packageType: string;
  price: number;
  datesOfClasses: DateOfClass[];
  yogaCategory: YogaCategory[] | string[];
  yTRequirement: YTRequirement[] | string[];
  yTRule: YTRule[] | string[];
  instructor: string | { _id: string; name: string; profilePic: string };
  startDate: string;
  endDate: string;
  approvalByAdmin: 'pending' | 'accepted' | 'rejected';
  instructorTimeZone: string;
  isBooked: boolean;
  classStartTimeInUTC?: string;
  createdAt: string;
}

interface YogaClassFilters {
  modeOfClass?: string;
  classType?: string;
  search?: string;
  approvalByAdmin?: 'pending' | 'accepted' | 'rejected';
  page?: number;
  resultPerPage?: number;
}

interface UserClassFilters {
  mOC?: string; // modeOfClass
  cT?: string; // classType
  search?: string;
  date?: string;
  timing?: string;
  pt?: string; // packageType
  miP?: number; // minimumPrice
  maP?: number; // maximumPrice
  page?: number;
  resultPerPage?: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
}

// Base URLs
const YOGA_CATEGORY_URL = '/admin/mas/y-c';
const SPECIALIZATION_URL = '/admin/mas/specialization';
const YT_REQUIREMENT_URL = '/admin/mas/yTRequirement';
const YT_RULE_URL = '/admin/mas/yTRule';
const YOGA_CLASS_URL = '/yoga-classes';

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
// Yoga Class Service
export const YogaClassService = {
  // Instructor endpoints
  addNewClass: async (classData: Partial<YogaClass>): Promise<ApiResponse<null>> => {
    try {
      const response = await api.post<ApiResponse<null>>(YOGA_CLASS_URL, classData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to add class' };
    }
  },

  getInstructorClasses: async (filters: YogaClassFilters = {}): Promise<ApiResponse<PaginatedResponse<YogaClass>>> => {
    try {
      const { modeOfClass, classType, search, approvalByAdmin = 'accepted', page = 1, resultPerPage = 20 } = filters;
      
      const params = new URLSearchParams();
      if (modeOfClass) params.append('modeOfClass', modeOfClass);
      if (classType) params.append('classType', classType);
      if (search) params.append('search', search);
      params.append('approvalByAdmin', approvalByAdmin);
      params.append('page', page.toString());
      params.append('resultPerPage', resultPerPage.toString());
      
      const response = await api.get<ApiResponse<PaginatedResponse<YogaClass>>>(`${YOGA_CLASS_URL}/instructor?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch instructor classes' };
    }
  },

  getClassDetails: async (classId: string): Promise<ApiResponse<YogaClass>> => {
    try {
      const response = await api.get<ApiResponse<YogaClass>>(`${YOGA_CLASS_URL}/instructor/${classId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch class details' };
    }
  },

  updateClass: async (classId: string, classData: Partial<YogaClass>): Promise<ApiResponse<null>> => {
    try {
      const response = await api.put<ApiResponse<null>>(`${YOGA_CLASS_URL}/${classId}`, classData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to update class' };
    }
  },

  deleteClass: async (classId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete<ApiResponse<null>>(`${YOGA_CLASS_URL}/${classId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete class' };
    }
  },

  // Admin endpoints
  getAdminClasses: async (filters: YogaClassFilters = {}): Promise<ApiResponse<PaginatedResponse<YogaClass>>> => {
    try {
      const { modeOfClass, classType, search, approvalByAdmin = 'pending', page = 1, resultPerPage = 20 } = filters;
      
      const params = new URLSearchParams();
      if (modeOfClass) params.append('modeOfClass', modeOfClass);
      if (classType) params.append('classType', classType);
      if (search) params.append('search', search);
      params.append('approvalByAdmin', approvalByAdmin);
      params.append('page', page.toString());
      params.append('resultPerPage', resultPerPage.toString());
      
      const response = await api.get<ApiResponse<PaginatedResponse<YogaClass>>>(`${YOGA_CLASS_URL}/admin?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch admin classes' };
    }
  },

  approveRejectClass: async (classId: string, approvalStatus: 'accepted' | 'rejected'): Promise<ApiResponse<null>> => {
    try {
      const response = await api.put<ApiResponse<null>>(`${YOGA_CLASS_URL}/approve/${classId}`, { approvalByAdmin: approvalStatus });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to update approval status' };
    }
  },

  // User endpoints
  getUserClasses: async (filters: UserClassFilters = {}): Promise<ApiResponse<PaginatedResponse<YogaClass>>> => {
    try {
      const { 
        mOC, cT = 'individual', search, date, timing, 
        pt, miP = 500, maP = 100000, page = 1, resultPerPage = 20 
      } = filters;
      
      const params = new URLSearchParams();
      if (mOC) params.append('mOC', mOC);
      if (cT) params.append('cT', cT);
      if (search) params.append('search', search);
      if (date) params.append('date', date);
      if (timing) params.append('timing', timing);
      if (pt) params.append('pt', pt);
      if (miP) params.append('miP', miP.toString());
      if (maP) params.append('maP', maP.toString());
      params.append('page', page.toString());
      params.append('resultPerPage', resultPerPage.toString());
      
      const response = await api.get<ApiResponse<PaginatedResponse<YogaClass>>>(`${YOGA_CLASS_URL}/user?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch classes for user' };
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
export type { 
  LoginCredentials, 
  RegisterData, 
  YTRequirement, 
  YTRule, 
  ApiResponse, 
  YogaClass,
  YogaCategory,
  DateOfClass,
  YogaClassFilters,
  UserClassFilters,
  PaginatedResponse
};