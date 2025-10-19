import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchTransactions, 
  transactionsSummary, 
  updateTransaction,
  addTransaction,
  deleteTransaction 
} from './transactionsOperations';

const initialState = {
  items: [],
  summary: {
    categoriesSummary: [],
    incomeSummary: 0,
    expensesSummary: 0,
    periodTotal: 0,
    year: null,
    month: null
  },
  date: { 
    month: 9, year: 2025 
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
      
      // transactionsSummary
      .addCase(transactionsSummary.pending, (state) => {
        state.loadingSummary = true;
        state.errorSummary = null;
      })
      .addCase(transactionsSummary.fulfilled, (state, action) => {
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
      .addCase(transactionsSummary.rejected, (state, action) => {
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
      });
  }
});

export const { updateDate } = transactionsSlice.actions;
export default transactionsSlice.reducer;