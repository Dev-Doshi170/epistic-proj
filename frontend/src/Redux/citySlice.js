// // citySlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   data: [],
//   pagination: {
//     totalPages: 0,
//     currentPage: 1,
//     count: 0,
//     rowsPerPage: 5,
//   },
// };

// const citySlice = createSlice({
//   name: 'city',
//   initialState,
//   reducers: {
//     setCityData: (state, action) => {
//         const { data, pagination } = action.payload;
//         state.data = data;
//         state.pagination = pagination;
//     },
//     setCityCurrentPage: (state, action) => {
//       state.pagination.currentPage = action.payload;
//     },
//     setCityRowsPerPage: (state, action) => {
//       state.pagination.rowsPerPage = action.payload;
//     },
//     setCityTotalPages: (state, action) => {
//       state.pagination.totalPages = action.payload;
//     },
//   },
// });

// export const {
//   setCityData,
//   setCityCurrentPage,
//   setCityRowsPerPage,
//   setCityTotalPages,
// } = citySlice.actions;
// export default citySlice.reducer;

// citySlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  pagination: {
    totalPages: 0,
    currentPage: 1,
    count: 0,
    rowsPerPage: 5,
  },
  sort:'asc',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCityData: (state, action) => {
      const { data, pagination } = action.payload;
      state.data = data;
      state.pagination.count = pagination.totalCount;
      state.pagination.currentPage = pagination.currentPage;
      state.pagination.totalPages = pagination.totalPages; 
    },
    setCurrentPage: (state, action) => {
        state.pagination.currentPage = action.payload;
      },
      setRowsPerPage: (state, action) => {
        state.pagination.rowsPerPage = action.payload;
      },
      setTotalPages: (state, action) => {
        state.pagination.totalPages = action.payload;
      },
      setSort: (state, action) => {
        state.sort = action.payload;
      },
  },
});

export const { setCityData,setCurrentPage,setRowsPerPage,setSort } = citySlice.actions;
export default citySlice.reducer;
