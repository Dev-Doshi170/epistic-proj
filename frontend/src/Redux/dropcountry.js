// countrySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countryData: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountryData(state, action) {
      state.countryData = action.payload;
    },
    // Add other reducer functions as needed
  },
});

export const { setCountryData } = countrySlice.actions;
export default countrySlice.reducer;
