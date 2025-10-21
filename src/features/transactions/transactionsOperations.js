import { createAsyncThunk } from '@reduxjs/toolkit';
import * as transactionsApi from '../../api/transactionsApi';
import { refreshUser } from '../auth/authOperations';

// ✅ FETCH ALL TRANSACTIONS
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await transactionsApi.getTransactions();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ ADD TRANSACTION
export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transactionData, { rejectWithValue }) => {
    try {
      const data = await transactionsApi.addTransaction(transactionData);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('❌ Add transaction error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ DELETE TRANSACTION (balance refresh ekle)
export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (transactionId, { dispatch, rejectWithValue }) => {
    try {
      await transactionsApi.deleteTransaction(transactionId);
      
      // ✅ Delete sonrası user bilgisini yenile (balance güncellensin)
      await dispatch(refreshUser());
      
      return { id: transactionId };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('❌ Delete transaction error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ UPDATE TRANSACTION
export const updateTransaction = createAsyncThunk(
  'transactions/update',
  async ({ id, transactionData }, { rejectWithValue }) => {
    try {
      const data = await transactionsApi.updateTransaction(id, transactionData);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('❌ Update transaction error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ FETCH CATEGORIES
export const fetchCategories = createAsyncThunk(
  'transactions/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await transactionsApi.getCategories();
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('❌ Fetch categories error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);