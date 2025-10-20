import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getCurrentUser,
  setAuthToken 
} from '../../api/authApi';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      if (data.token) {
        setAuthToken(data.token);
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      if (data.token) {
        setAuthToken(data.token);
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn('Logout error:', error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      setAuthToken(token);
      const data = await getCurrentUser();
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Token is invalid';
      return rejectWithValue(message);
    }
  }
);