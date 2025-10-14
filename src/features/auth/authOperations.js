import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://wallet.b.goit.study/api';


// axios instance
const instance = axios.create({
  baseURL: API_URL,
});

const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};


// post /api/auth/sign-up
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      // credentials: username, email, password
      const response = await instance.post('/auth/sign-up', credentials);
      // response: username, email, token
      
      setAuthHeader(response.data.token); // add token to header
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// post /api/auth/sign-in
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // credentials: email, password
      const response = await instance.post('/auth/sign-in', credentials);
      // response: username, email, token
      
      setAuthHeader(response.data.token); // add token to header
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// delete /api/auth/sign-out
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await instance.delete('/auth/sign-out');
      
      clearAuthHeader(); // remove token from header
    } catch {
      clearAuthHeader();
    }
  }
);


//  get /api/users/current
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // get token from redux store
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    // if no token, exit
    if (!persistedToken) {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      setAuthHeader(persistedToken); // add token to header
      // get user data
      const response = await instance.get('/users/current');
      // response: username, email
      return response.data;
    } catch {
      clearAuthHeader();
      return thunkAPI.rejectWithValue('Invalid token');
    }
  }
);

export default instance;