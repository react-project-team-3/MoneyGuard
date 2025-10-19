import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './authOperations';

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

  // api calls
  extraReducers: (builder) => {
    builder
      // /api/auth/sign-up
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const payload = action.payload || {};
        // Support payload shapes: { username, email, token } or { user: { ... }, token }
        const userData =
          payload.user ||
          (payload.username ? { username: payload.username, email: payload.email } : payload);
        const token =
          payload.token || payload.accessToken || (payload.data && payload.data.token) || null;
        // ensure username exists for display
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

      // /api/auth/sign-in
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

      // /api/auth/sign-out
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

      // /api/users/current
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
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
