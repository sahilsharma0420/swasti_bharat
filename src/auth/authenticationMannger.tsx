import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/apiService";

// Define types
interface User {
  // Add user properties based on your actual user object
  id?: string;
  email?: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  register: (userData: any) => Promise<any>;
  login: (credentials: any) => Promise<any>;
  logout: () => void;
}

// Create context with proper typing
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (localStorage.getItem("auth_token")) {
          const { data } = await authService.getCurrentUser();
          setCurrentUser(data);
        }
      } catch (err) {
        console.error("Failed to load user", err);
        // Clear invalid token
        localStorage.removeItem("auth_token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register new user
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      console.log(response.data.data)
      
      const { accessToken, isAdmin } = response.data.data;
      
      // Save token to localStorage
      localStorage.setItem("auth_token", accessToken);
      
      // Update user in state
      setCurrentUser(isAdmin);
      
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    localStorage.removeItem("auth_token");
    setCurrentUser(null);
  };

  // Context value
  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;