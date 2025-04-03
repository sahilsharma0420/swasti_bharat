import api from "@/middlewares/auth.interceptor";

const YOGA_CATEGORY_URL = '/admin/mas/y-c';

export const YogaCategoryService = {
  // Get all yoga categories
  getAllCategories: async () => {
    try {
      const response = await api.get(YOGA_CATEGORY_URL);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch yoga categories' };
    }
  },

  // Get a specific yoga category by ID
  getCategoryById: async (id: string) => {
    try {
      const response = await api.get(`${YOGA_CATEGORY_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch yoga category' };
    }
  },

  // Add a new yoga category
  createCategory: async (categoryData: any) => {
    try {
      const response = await api.post(YOGA_CATEGORY_URL, {
        yogaCategory: categoryData.category,
        description:categoryData.description
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to create yoga category' };
    }
  },

  // Update an existing yoga category
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

  // Delete a yoga category
  deleteCategory: async (id: string) => {
    try {
      const response = await api.delete(`${YOGA_CATEGORY_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete yoga category' };
    }
  }
};