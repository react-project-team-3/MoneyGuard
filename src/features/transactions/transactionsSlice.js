import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  fetchCategories,
} from './transactionsOperations';

const initialState = {
  transactions: [],
  categories: [],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH TRANSACTIONS
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ADD TRANSACTION
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE TRANSACTION
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== deletedId
        );
        console.log('✅ Transaction deleted, ID:', deletedId);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('❌ Delete transaction failed:', action.payload);
      })

      // UPDATE TRANSACTION
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // FETCH CATEGORIES
      .addCase(fetchCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;