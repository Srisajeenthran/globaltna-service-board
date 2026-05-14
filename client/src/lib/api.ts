import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Jobs API
export const getJobs = async (params = {}) => {
  const { data } = await api.get('/jobs', { params });
  return data;
};

export const getJob = async (id: string) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};

export const createJob = async (jobData: any) => {
  const { data } = await api.post('/jobs', jobData);
  return data;
};

export const updateJob = async (id: string, jobData: any) => {
  const { data } = await api.patch(`/jobs/${id}`, jobData);
  return data;
};

export const updateJobStatus = async (id: string, status: string) => {
  const { data } = await api.patch(`/jobs/${id}`, { status });
  return data;
};

export const deleteJob = async (id: string) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};

// Auth API
export const loginUser = async (credentials: any) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const registerUser = async (userData: any) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export default api;
