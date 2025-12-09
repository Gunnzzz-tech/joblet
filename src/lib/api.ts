const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  responsibilities: string;
  role: string;
  category: string;
  location: string;
  isRemote: boolean;
  workSchedule: string[];
  employmentType: string[];
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  salaryType: string;
  status: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    industry?: string;
  };
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';
  avatar?: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  status: string;
  createdAt: string;
  job?: Job;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || {
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred',
          },
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  }

  // Auth endpoints
  async register(email: string, password: string, firstName: string, lastName: string, role: string) {
    return this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName, role }),
    });
  }

  async login(email: string, password: string) {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    localStorage.removeItem('token');
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getCurrentUser() {
    return this.request<User>('/auth/me');
  }

  async getGoogleAuthUrl() {
    return this.request<{ url: string }>('/auth/google');
  }

  // Job endpoints
  async getJobs(params?: {
    keyword?: string;
    location?: string;
    minSalary?: number;
    maxSalary?: number;
    experience?: string;
    workSchedule?: string;
    employment?: string;
    category?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });
    }
    const queryString = queryParams.toString();
    return this.request<{ jobs: Job[]; pagination: any }>(
      `/jobs${queryString ? `?${queryString}` : ''}`
    );
  }

  async getJobById(id: string) {
    return this.request<Job>(`/jobs/${id}`);
  }

  async getJobBySlug(slug: string) {
    return this.request<Job>(`/jobs/slug/${slug}`);
  }

  async createJob(jobData: Partial<Job>) {
    return this.request<Job>('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(id: string, jobData: Partial<Job>) {
    return this.request<Job>(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id: string) {
    return this.request(`/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  // Application endpoints
  async submitApplication(jobId: string, coverLetter: string, resumeUrl?: string, portfolioUrl?: string) {
    return this.request<Application>('/applications', {
      method: 'POST',
      body: JSON.stringify({ jobId, coverLetter, resumeUrl, portfolioUrl }),
    });
  }

  async getUserApplications() {
    return this.request<Application[]>('/applications');
  }

  async getJobApplications(jobId: string) {
    return this.request<Application[]>(`/applications/job/${jobId}`);
  }

  async updateApplicationStatus(id: string, status: string) {
    return this.request<Application>(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(profileData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Company endpoints
  async getCompanies() {
    return this.request('/companies');
  }

  async getCompanyById(id: string) {
    return this.request(`/companies/${id}`);
  }

  async createCompany(companyData: any) {
    return this.request('/companies', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  }

  async updateCompany(id: string, companyData: any) {
    return this.request(`/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(companyData),
    });
  }

  // Contact endpoint
  async submitContactForm(name: string, email: string, message: string) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, message }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);

