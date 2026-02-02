import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env.config';
import { logger } from './logger';
import { useAuthStore } from '@/store/auth.store';

/**
 * Global Axios Instance Configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Useful for adding Auth tokens or custom headers before the request is sent
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from Zustand store
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logger.error('Request Interceptor Error', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Standardize error handling and global actions (like logout on 401)
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const responseData = error.response?.data as { message?: string } | undefined;
    const message = responseData?.message || error.message || 'Something went wrong';

    logger.error(`API Error [${status || 'NETWORK'}]: ${message}`, {
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });

    // Global handling for specific status codes
    if (status === 401) {
      // Logic for unauthorized: Clear local storage/session and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // window.location.href = '/login'; // Uncomment and adjust as needed
      }
    }

    if (status === 403) {
      logger.warn('User does not have permission for this action');
    }

    return Promise.reject({
      message,
      status,
      data: error.response?.data,
      originalError: error,
    });
  }
);

export default apiClient;
