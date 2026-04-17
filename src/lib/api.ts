// API Configuration for E-Nutrition Mock Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Dashboard
  getDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard`);
    return response.json();
  },

  // Users
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  getUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  // Nutrition Data
  getNutritionData: async (userId?: string) => {
    const url = userId ? `${API_BASE_URL}/nutrition/${userId}` : `${API_BASE_URL}/nutrition`;
    const response = await fetch(url);
    return response.json();
  },

  // Analytics
  getAnalytics: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    return response.json();
  },

  // Announcements
  getAnnouncements: async () => {
    const response = await fetch(`${API_BASE_URL}/announcements`);
    return response.json();
  },

  // Reports
  getReports: async () => {
    const response = await fetch(`${API_BASE_URL}/reports`);
    return response.json();
  },

  generateReport: async (reportType: string, format: string) => {
    const response = await fetch(`${API_BASE_URL}/reports/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportType, format }),
    });
    return response.json();
  },

  // AI Insights
  getAIInsights: async () => {
    const response = await fetch(`${API_BASE_URL}/ai-insights`);
    return response.json();
  },

  // Data Collection
  uploadData: async (fileName: string, records: number) => {
    const response = await fetch(`${API_BASE_URL}/data-collection/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, records }),
    });
    return response.json();
  },

  getUploadStatus: async (uploadId: string) => {
    const response = await fetch(`${API_BASE_URL}/data-collection/status/${uploadId}`);
    return response.json();
  },

  // Data Warehouse
  queryDataWarehouse: async (startDate?: string, endDate?: string, userId?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (userId) params.append('userId', userId);
    
    const url = `${API_BASE_URL}/data-warehouse?${params.toString()}`;
    const response = await fetch(url);
    return response.json();
  },

  // Integrations
  getIntegrations: async () => {
    const response = await fetch(`${API_BASE_URL}/integrations`);
    return response.json();
  },

  // Training
  getTrainingCourses: async () => {
    const response = await fetch(`${API_BASE_URL}/training`);
    return response.json();
  },

  // Public Portal
  getPublicPortalInfo: async () => {
    const response = await fetch(`${API_BASE_URL}/public-portal/info`);
    return response.json();
  },

  // Health Check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};

// Error handler utility
export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export default apiClient;
