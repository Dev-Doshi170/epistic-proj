// stateSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  pagination: {
    totalPages: 0,
    currentPage: 1,
    count: 0,
    rowsperpage: 5,
  },
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setData: (state, action) => {
      const { data, pagination } = action.payload;
      state.data = data;
      state.pagination.totalPages = pagination.totalPages;
      state.pagination.count = pagination.totalCount;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.pagination.rowsperpage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.pagination.totalPages = action.payload;
    },
  },
});

export const { setData, totalPages, setCurrentPage, setCount, setRowsPerPage, setTotalPages } = stateSlice.actions;
export default stateSlice.reducer;
