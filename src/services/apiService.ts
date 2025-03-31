import axios from "axios";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for token handling if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
const authService = {
  register: (userData:any) => {
    return apiClient.post("/admin/register", userData);
  },
  login: (credentials:any) => {
    return apiClient.post("/admin/login", credentials);
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    // You can add additional logout logic here
  },
  getCurrentUser: () => {
    // You'll need to implement this endpoint on your backend
    return apiClient.get("/admin");
  },
};

export { apiClient, authService };