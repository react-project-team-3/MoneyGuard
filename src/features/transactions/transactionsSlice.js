import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  fetchCategories,
  getTransactionsSummary,
} from './transactionsOperations';

const initialState = {
  items: [],
  categories: [],
  summary: {
    categoriesSummary: [],
    incomeSummary: 0,
    expensesSummary: 0,
    periodTotal: 0,
    year: null,
    month: null
  },
  date: { 
    month: 9, 
    year: 2025
  },
  loading: false,
  loadingSummary: false,
  error: null,
  errorSummary: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateDate: (state, action) => {
      state.date = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchTransactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      //  getTransactionsSummary
      .addCase(getTransactionsSummary.pending, (state) => {
        state.loadingSummary = true;
        state.errorSummary = null;
      })
      .addCase(getTransactionsSummary.fulfilled, (state, action) => {
        state.loadingSummary = false;
        state.summary = {
          categoriesSummary: action.payload.categoriesSummary || [],
          incomeSummary: action.payload.inconsSummary || 0,
          expensesSummary: action.payload.expansionBinary || 0,
          periodTotal: action.payload.periodTotal || 0,
          year: action.payload.year,
          month: action.payload.month
        };
      })
      .addCase(getTransactionsSummary.rejected, (state, action) => {
        state.loadingSummary = false;
        state.errorSummary = action.payload;
      })
      
      // updateTransaction
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTransaction = action.payload;
        const index = state.items.findIndex(item => item.id === updatedTransaction.id);
        if (index !== -1) {
          state.items[index] = updatedTransaction;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // addTransaction
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // deleteTransaction
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  }
});

export const { updateDate } = transactionsSlice.actions;
export default transactionsSlice.reducer;