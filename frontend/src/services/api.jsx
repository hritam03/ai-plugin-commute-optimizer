import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      error.message = 'Resource not found';
    } else if (error.response?.status === 400) {
      error.message = error.response.data?.message || 'Invalid request';
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }
    return Promise.reject(error);
  }
);

export const pgApi = {
  createPg: (data) => axiosInstance.post('/pgs', data),

  getAllPgs: (page = 0, size = 5, area = null, maxRent = null) => {
    const params = { page, size };
    if (area) params.area = area;
    if (maxRent) params.maxRent = maxRent;
    return axiosInstance.get('/pgs/getAllPg', { params });
  },

  getPgById: (id) => axiosInstance.get(`/pgs/${id}`),

  getRecommendations: (officeLocation, preferredArea = '', budget) =>
    axiosInstance.post('/recommendations', {
      officeLocation,
      preferredArea,
      budget,
    }),
};

export default axiosInstance;
