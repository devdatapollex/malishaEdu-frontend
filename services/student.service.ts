import apiClient from '@/lib/api-client';

export interface Student {
  id: string;
  studentID: string;
  userId: string;
  phoneNumber: string;
  gender: string;
  nationality: string;
  dateOfBirth: string;
  createdAt: string;
  branchId?: string;
  branch?: {
    id: string;
    branchName: string;
  };
  registeredBy?: {
    id: string;
    name: string;
    role: string;
    branch?: { branchName: string };
    admin?: { name: string };
  };
  assignedBy?: {
    name: string;
  };
  counselorId?: string;
  counselor?: {
    id: string;
    user: { name: string };
  };
  user: {
    name: string;
    email: string;
    role: string;
    status: string;
  };
  lastDegree?: string;
  instituteName?: string;
  cgpa?: string;
  studyLevel?: string;
  fundingSource?: string;
  workExperience?: string;
  gapYear?: string;
  passportNo?: string;
  nid?: string;
  qualifications?: Array<{
    degree: string;
    passingYear: string;
    board: string;
    result: string;
    group: string;
  }>;
  testScores?: Array<{
    testType: string;
    score: string;
  }>;
  preferences?: Array<{
    countries: string;
    intakeYear: string;
    session: string;
    subject: string;
    budget?: string;
  }>;
  registrarName?: string;
  assignedAt?: string;
  documents: Array<{
    id: string;
    fileName: string;
    fileType?: string;
    documentType: string;
    documentUrl: string;
    title?: string;
  }>;
}

export interface StudentsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Student[];
}

export interface StudentFilters {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export const studentService = {
  /**
   * Get all students with pagination and filters
   */
  getAllStudents: async (filters?: StudentFilters): Promise<StudentsResponse> => {
    const params = new URLSearchParams();
    if (filters?.searchTerm) params.append('searchTerm', filters.searchTerm);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<StudentsResponse>(
      `/students${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data;
  },

  /**
   * Register a new student (Admin/Counselor/Branch)
   */
  registerStudent: async (data: {
    name: string;
    email: string;
    password?: string;
    student?: {
      // Contact Information
      phoneNumber?: string;
      secondaryPhone?: string;
      socialProfiles?: string[];

      // Personal Details
      gender?: string;
      dateOfBirth?: string;
      nationality?: string;
      passportNum?: string;
      passportExpiry?: string;

      // Study Preferences
      preferredCountry?: string[];
      courseLevel?: string;
      interestedCourses?: string[];
      budget?: string;
      scholarshipInterest?: boolean;

      // Qualification Details
      lastDegree?: string;
      lastInstitute?: string;
      cgpa?: string;
      englishTestScore?: string;
    };
  }): Promise<{ user: Student['user']; student: Student }> => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      student: data.student || {},
    };

    const response = await apiClient.post<{ data: { user: Student['user']; student: Student } }>(
      '/student/register',
      payload
    );
    return response.data.data;
  },

  /**
   * Get students registered by current user (for COUNSELOR, BRANCH roles)
   */
  getMyStudents: async (filters?: StudentFilters): Promise<StudentsResponse> => {
    const params = new URLSearchParams();
    if (filters?.searchTerm) params.append('searchTerm', filters.searchTerm);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<StudentsResponse>(
      `/students/my-students${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data;
  },

  /**
   * Get single student by ID
   */
  getSingleStudent: async (id: string): Promise<Student> => {
    const response = await apiClient.get<{ data: Student }>(`/students/${id}`);
    return response.data.data;
  },

  /**
   * Delete student by ID
   */
  deleteStudent: async (id: string): Promise<void> => {
    await apiClient.delete(`/students/${id}`);
  },

  /**
   * Update student by ID
   */
  updateStudent: async (id: string, data: any): Promise<Student> => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    const response = await apiClient.patch<{ data: Student }>(`/students/${id}`, data);
    return response.data.data;
  },

  /**
   * Get logged-in student's profile
   */
  getStudentProfile: async (): Promise<Student | null> => {
    const response = await apiClient.get<StudentsResponse>('/students/my-students');
    if (response.data.data && response.data.data.length > 0) {
      // The server maps registrarName for each student in the list
      return response.data.data[0];
    }
    return null;
  },

  /**
   * Assign student to branch
   */
  assignBranch: async (studentId: string, branchId: string): Promise<Student> => {
    const response = await apiClient.patch<{ data: Student }>(
      `/students/${studentId}/assign-branch`,
      { branchId }
    );
    return response.data.data;
  },

  /**
   * Assign student to counselor
   */
  assignCounselor: async (studentId: string, counselorId: string): Promise<Student> => {
    const response = await apiClient.patch<{ data: Student }>(
      `/students/${studentId}/assign-counselor`,
      { counselorId }
    );
    return response.data.data;
  },
};
