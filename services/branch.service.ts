import apiClient from '@/lib/api-client';

export interface Branch {
  id: string;
  branchName: string;
  branchID: string;
  address: string;
  phoneNumber: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  counselors?: Array<{
    id: string;
    user: {
      name: string;
      email: string;
    };
  }>;
  students?: Array<{
    id: string;
  }>;
}

export interface BranchFilters {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface BranchResponse {
  data: Branch[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export const branchService = {
  /**
   * Get all branches with pagination and filters (Admin only)
   */
  getAllBranches: async (filters?: BranchFilters): Promise<BranchResponse> => {
    const params = new URLSearchParams();

    if (filters?.searchTerm) {
      params.append('searchTerm', filters.searchTerm);
    }
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `/branches?${queryString}` : '/branches';

    const response = await apiClient.get<{ data: Branch[] }>(url);

    // If backend doesn't return meta, create it from data
    return {
      data: response.data.data,
      meta: {
        page: filters?.page || 1,
        limit: filters?.limit || 12,
        total: response.data.data.length,
      },
    };
  },

  /**
   * Delete a branch (Admin only)
   */
  deleteBranch: async (id: string): Promise<void> => {
    await apiClient.delete(`/branches/${id}`);
  },

  /**
   * Create a new branch (Admin only)
   */
  createBranch: async (data: {
    name: string;
    email: string;
    password?: string;
    branch: {
      branchName: string;
      address: string;
      phoneNumber: string;
      profileImage?: string;
    };
  }): Promise<Branch> => {
    const response = await apiClient.post<{ data: Branch }>('/branches', data);
    return response.data.data;
  },

  /**
   * Get a single branch by ID (Admin only)
   */
  getBranchById: async (id: string): Promise<Branch> => {
    const response = await apiClient.get<{ data: Branch }>(`/branches/${id}`);
    return response.data.data;
  },

  /**
   * Update branch status (Admin only)
   */
  updateBranchStatus: async (id: string, status: string): Promise<void> => {
    await apiClient.patch(`/branches/${id}/status`, { status });
  },
};
