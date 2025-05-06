import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import authService from "./services/authService";
import router from "@/router";

const api = axios.create({
  baseURL: 'http://45.83.20.244:5509/api/v1',
  paramsSerializer: {
    indexes: null,
  },
});

// Send token with every request
api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.getToken) {
    config.headers.Authorization = `Bearer ${authStore.getToken}`;
  }
  return config;
});

// Refresh tokens if resopnse status is 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Чтобы избежать нескольких одновременных refresh-запросов
        const response = await authService.refresh();
        const { token } = response.data
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Перенаправляем на страницу входа при неудачном refresh
        router.replace({ name: 'login' })
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api