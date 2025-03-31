
import api from "@/middlewares/auth.interceptor";

const SPECIALIZATION_URL = '/admin/mas/specialization';

export const SpecializationService = {
  // Create a new specialization
  createSpecialization: async (specializationData:any) => {
    try {
      const response = await api.post(SPECIALIZATION_URL, specializationData);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || { message: 'Failed to create specialization' };
    }
  },

  // Get all specializations
  getAllSpecializations: async () => {
    try {
      const response = await api.get(SPECIALIZATION_URL);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || { message: 'Failed to fetch specializations' };
    }
  },

  // Get a specific specialization by ID
  getSpecializationById: async (id:any) => {
    try {
      const response = await api.get(`${SPECIALIZATION_URL}/${id}`);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || { message: 'Failed to fetch specialization' };
    }
  },

  // Update a specialization
  updateSpecialization: async (id:any, specializationData:any) => {
    try {
      const response = await api.put(`${SPECIALIZATION_URL}/${id}`, specializationData);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || { message: 'Failed to update specialization' };
    }
  },

  // Delete a specialization
  deleteSpecialization: async (id:any) => {
    try {
      const response = await api.delete(`${SPECIALIZATION_URL}/${id}`);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || { message: 'Failed to delete specialization' };
    }
  }
};

export default SpecializationService;