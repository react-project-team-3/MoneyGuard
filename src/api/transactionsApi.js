import authApi from './authApi';

export const getTransactions = async () => {
  const response = await authApi.get('/transactions');
  return response.data;
};

export const addTransaction = async (transactionData) => {
  const response = await authApi.post('/transactions', transactionData);
  return response.data;
};

export const deleteTransaction = async (transactionId) => {
  const response = await authApi.delete(`/transactions/${transactionId}`);
  return response.data;
};

export const updateTransaction = async (transactionId, transactionData) => {
  const response = await authApi.patch(
    `/transactions/${transactionId}`,
    transactionData
  );
  return response.data;
};

export const getCategories = async () => {
  const response = await authApi.get('/transaction-categories');
  return response.data;
};