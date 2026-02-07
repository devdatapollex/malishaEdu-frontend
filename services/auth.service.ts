import apiClient from '@/lib/api-client';

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'STUDENT' | 'AGENT' | 'ADMIN' | 'SUPER_ADMIN' | 'BRANCH' | 'COUNSELOR';
      status: string;
    };
    accessToken: string;
    refreshToken: string;
  };
};

/**
 * Authentication Service
 * Handles all login and session-related API calls.
 */
export const authService = {
  /**
   * Login user to the system
   */
  login: async (payload: Record<string, unknown>): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', payload);
    return response.data;
  },

  /**
   * Register a new student
   */
  register: async (payload: Record<string, unknown>): Promise<unknown> => {
    const response = await apiClient.post('/students/self-register', payload);
    return response.data;
  },

  /**
   * Logout user and clear session
   */
  logout: async () => {
    await apiClient.post('/auth/logout');
  },
};
