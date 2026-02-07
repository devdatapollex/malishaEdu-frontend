import apiClient from '@/lib/api-client';

export interface Counselor {
  id: string;
  counselorID: string;
  phoneNumber: string;
  profileImage?: string;
  branchId: string;
  user: {
    name: string;
    email: string;
  };
  branch: {
    branchName: string;
  };
}

export const counselorService = {
  /**
   * Get all counselors (Admin/Branch)
   */
  getAllCounselors: async (filters?: { branchId?: string }): Promise<Counselor[]> => {
    const response = await apiClient.get<{ data: Counselor[] }>('/counselors', {
      params: filters,
    });
    return response.data.data;
  },
};
