import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/stores/authSlice";
import { AuthService } from "@/services/apiService";
import type { AppDispatch } from "@/stores/store";

// Define user type
interface User {
  id?: string;
  email?: string;
  name?: string;
  // Extend with other user properties
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  register: (userData: any) => Promise<any>;
  login: (credentials: any) => Promise<any>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Typed dispatch
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          const action = await dispatch(getCurrentUser());

          // Check if fulfilled
          if (getCurrentUser.fulfilled.match(action)) {
            setCurrentUser(action.payload); // ✅ Set from Redux result
          } else {
            localStorage.removeItem("auth_token");
          }
        }
      } catch (err) {
        console.error("Failed to load user", err);
        localStorage.removeItem("auth_token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch]);

  // Register
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.register(userData);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.login(credentials);
      const { accessToken, user } = response.data.data;

      localStorage.setItem("auth_token", accessToken);
      setCurrentUser(user); // ✅ Should be `user`, not `isAdmin`
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    AuthService.logout();
    localStorage.removeItem("auth_token");
    setCurrentUser(null);
  };

  // Provide context
  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
