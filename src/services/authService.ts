// src/services/authService.ts
import api from '@/middlewares/auth.interceptor';
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

const authService = {
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

export default authService;