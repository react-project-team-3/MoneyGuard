import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getTransactionsApi,
  transactionsSummApi,
  updateTransactionsApi,
  addTransactionsApi,
  deleteTransactionApi
} from '../../api/transactionsApi';


export const fetchTransactions = createAsyncThunk(
  "transactions/getAll",
    async (_, {rejectWithValue, getState}) => {
      try {
        const token = getState().auth?.token;
        const res = await getTransactionsApi(token);
        return res;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "An error occurred while processing transactions");
      }
    }
);

export const transactionsSummary = createAsyncThunk(
  "transactions/transactionsSummary",
    async (date, {rejectWithValue, getState}) => {
      try {
        const token = getState().auth?.token;
        const res = await transactionsSummApi(date, token);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occured while taking summary"
        );
      }
    }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ transactionId, updateData }, { rejectWithValue, getState }) => {
    try{
      const token = getState().auth?.token;
      const res = await updateTransactionsApi(transactionId, updateData, token);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred while updating the transaction"
      );
    }
  }
)

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue, getState }) => {
    try{
      const token = getState().auth?.token;
      const res = await addTransactionsApi(transactionData, token);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occured while adding new transaction"
      );
    }
  } 
)

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      await deleteTransactionApi(transactionId, token);
      return transactionId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "İşlem silinirken hata oluştu"
      );
    }
  }
);
