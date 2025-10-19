import { createAsyncThunk } from '@reduxjs/toolkit';
import * as currencyApi from '../../api/currencyApi';

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await currencyApi.getCurrencyRates();
      return data;
    } catch (error) {
      const status = error.response?.status;
      if (status === 429) {
        return rejectWithValue(
          'Rate limit exceeded for currency API. Showing cached data if available.'
        );
      }
      return rejectWithValue(error.message || 'Failed to fetch currency rates');
    }
  }
);
