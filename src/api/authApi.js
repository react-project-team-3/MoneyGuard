import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://wallet.b.goit.study/api';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getTokenFromStorage = () => {
  try {
    const persistAuth = localStorage.getItem('persist:auth');
    if (persistAuth) {
      const parsedAuth = JSON.parse(persistAuth);
      if (parsedAuth.token) {
        let token = JSON.parse(parsedAuth.token);
        if (typeof token === 'string') {
          token = token.replace(/^["'](.*)["']$/, '$1');
        }
        return token;
      }
    }
  } catch (error) {
    console.error('Error getting token from storage:', error);
  }
  return null;
};

authApi.interceptors.request.use((config) => {
  const token = getTokenFromStorage();
  console.log('[authApi] Request interceptor - Token:', token ? 'VAR (length: ' + token.length + ')' : 'YOK');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const registerUser = async (userData) => {
  const response = await authApi.post('/auth/sign-up', userData);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await authApi.post('/auth/sign-in', credentials);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response.data;
};

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

export const getCurrentUser = async () => {
  const response = await authApi.get('/users/current');
  return response.data;
};

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

console.log('[authApi] Module loaded, interceptor added');

export default authApi;