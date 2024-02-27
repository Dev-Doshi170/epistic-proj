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
      state.pagination.currentPage = pagination.currentPage;
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
    setUpdatedData:(state,action) =>{
      const updatedstate = action.payload
      const stateid = updatedstate.stateid
      const stateindex = state.data.findIndex(state => state.stateid === stateid);
      if (stateindex != -1){
        state.data[stateindex]= updatedstate;
      }
    },
    addData: (state, action) => {
      const { data, pagination } = action.payload;
      state.data = data;
      state.pagination.totalPages = pagination.totalPages;
      state.pagination.count = pagination.totalCount;
      state.pagination.currentPage=pagination.currentPage;
    },
    
  },
});

export const { addData,setData, totalPages, setCurrentPage, setCount, setRowsPerPage, setTotalPages,setUpdatedData } = stateSlice.actions;
export default stateSlice.reducer;
