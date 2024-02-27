// modalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  mode: null, // 'add', 'edit', or null for neither
  statename: null,
  countryname: null,
  stateid: null, // Include stateid in the initial state
  countryid: null, // Include countryid in the initial state
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.mode = action.payload.mode || null;
      state.statename = action.payload.state ? action.payload.state.statename : null;
      state.countryname = action.payload.state ? action.payload.state.countryname : null;
      state.stateid = action.payload.state ? action.payload.state.stateid : null; // Set stateid
      state.countryid = action.payload.state ? action.payload.state.countryid : null; // Set countryid
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = null;
      state.statename = null;
      state.countryname = null;
      state.stateid = null; // Reset stateid on closing modal
      state.countryid = null; // Reset countryid on closing modal
    },
    setMode: (state, action) => {
      state.mode = action.payload.mode || null;
    },
    setStatename: (state, action) => {
      state.statename = action.payload.statename || null;
    },
    setCountryname: (state, action) => {
      state.countryname = action.payload.countryname || null;
    },
    setStateId: (state, action) => {
      state.stateid = action.payload.stateid || null;
    },
    setCountryId: (state, action) => {
      console.log(action.payload)
      state.countryid = action.payload.countryid || null;
    },
  },
});

export const {
  openModal,
  closeModal,
  setMode,
  setStatename,
  setCountryname,
  setStateId,
  setCountryId,
} = modalSlice.actions;
export default modalSlice.reducer;
