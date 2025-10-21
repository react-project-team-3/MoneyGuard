import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './authOperations';
import { addTransaction, deleteTransaction, updateTransaction } from '../transactions/transactionsOperations';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const userData =
          payload.user ||
          (payload.username ? { username: payload.username, email: payload.email } : payload);
        const token =
          payload.token || payload.accessToken || (payload.data && payload.data.token) || null;
        if (userData && !userData.username && userData.email) {
          userData.username = userData.email.split('@')[0];
        }
        state.user = userData;
        state.isLoading = false;
        state.token = token;
        state.isLoggedIn = !!token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || 'Registration failed';
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const userData =
          payload.user ||
          (payload.username ? { username: payload.username, email: payload.email } : payload);
        const token =
          payload.token || payload.accessToken || (payload.data && payload.data.token) || null;
        state.user = userData;
        state.isLoading = false;
        state.token = token;
        state.isLoggedIn = !!token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || 'Login failed';
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = 'Failed to refresh user';
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        if (state.user && action.payload?.balanceAfter !== undefined) {
          state.user.balance = action.payload.balanceAfter;
        }
      })

      .addCase(deleteTransaction.fulfilled, () => {
      })

      .addCase(updateTransaction.fulfilled, (state, action) => {
        if (state.user && action.payload?.balanceAfter !== undefined) {
          state.user.balance = action.payload.balanceAfter;
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;