import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://wallet.b.goit.study/api';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// token yönetimi
export const setAuthToken = (token) => {
  if (token) {
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common['Authorization'];
  }
};

export const clearAuthToken = () => {
  delete authApi.defaults.headers.common['Authorization'];
};

// API endpoints

// register
export const registerUser = async (userData) => {
  const response = await authApi.post('/auth/sign-up', userData);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

// login
export const loginUser = async (credentials) => {
  const response = await authApi.post('/auth/sign-in', credentials);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

// logout
export const logoutUser = async () => {
  try {
    const response = await authApi.delete('/auth/sign-out');
    clearAuthToken();
    return response.data;
  } catch (error) {
    clearAuthToken();
    throw error;
  }
};

// get current user
export const getCurrentUser = async () => {
  const response = await authApi.get('/users/current');
  return response.data;
};

// response interceptor
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      localStorage.removeItem('persist:auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default authApi;