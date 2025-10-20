import axios from 'axios';

const API_BASE_URL = 'https://wallet.b.goit.study/api';

const transactionsApi = axios.create({
  baseURL: API_BASE_URL,
});

transactionsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || 
                localStorage.getItem('accessToken') ||
                localStorage.getItem('authToken');
  
  if (!token) {
    const persistRoot = localStorage.getItem('persist:root');
    if (persistRoot) {
      try {
        const parsed = JSON.parse(persistRoot);
        const auth = parsed.auth ? JSON.parse(parsed.auth) : null;
        const foundToken = auth?.token || auth?.accessToken;
        if (foundToken) {
          config.headers.Authorization = `Bearer ${foundToken}`;
          return config;
        }
      } catch (e) {
        console.error('Token parse error:', e);
      }
    }
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export const getTransactions = async () => {
  const response = await transactionsApi.get('/transactions');
  return response.data;
};

export const addTransaction = async (transactionData) => {
  const response = await transactionsApi.post('/transactions', transactionData);
  return response.data;
};

export const deleteTransaction = async (transactionId) => {
  const response = await transactionsApi.delete(`/transactions/${transactionId}`);
  return response.data;
};

export const updateTransaction = async (transactionId, transactionData) => {
  const response = await transactionsApi.patch(
    `/transactions/${transactionId}`,
    transactionData
  );
  return response.data;
};

export const getCategories = async () => {
  const response = await transactionsApi.get('/transaction-categories');
  return response.data;
};