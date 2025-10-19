import authApi from './authApi';

export const getTransactionsSummary = async (month, year) => {
  const response = await authApi.get('/transactions-summary', {
    params: { month, year },
  });
  return response.data;
};