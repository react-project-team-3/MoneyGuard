import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrencyRates } from './currencyOperations';

const initialState = {
  rates: [],
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.rates = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default currencySlice.reducer;