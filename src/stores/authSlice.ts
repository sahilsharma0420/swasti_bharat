// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/middlewares/auth.interceptor';
// Define types
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Async thunks for authentication actions
export const login = createAsyncThunk(
  'admin/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log(credentials)
      const response = await api.post('/admin/login', credentials);
      const { accessToken, user } = response.data.data;
      
      // Save token to localStorage
      localStorage.setItem('auth_token', accessToken);
      
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'admin/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
      return null;
    } catch (error: any) {
      localStorage.removeItem('auth_token');
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      const response = await api.get('/admin/me');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Return null instead of throwing
        return null;
      }

      return rejectWithValue(error.response?.data?.message || "Failed to get user");
    }
  }
);
const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
      })
      
      // Get current user cases
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.currentUser = action.payload;
          state.isAuthenticated = true;
        } else {
          state.loading = false;
          state.isAuthenticated = false;
        }
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.isAuthenticated = false;
      });
  }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;