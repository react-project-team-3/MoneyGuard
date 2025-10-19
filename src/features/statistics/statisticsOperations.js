import { createAsyncThunk } from '@reduxjs/toolkit';
import * as statisticsApi from '../../api/statisticsApi';

export const fetchStatistics = createAsyncThunk(
  'statistics/fetch',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const data = await statisticsApi.getTransactionsSummary(month, year);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }
);