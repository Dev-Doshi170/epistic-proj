import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  mode: null,
  stateData: [],
  selectedState: null,
  selectedStateId: null, // New state property to store the selected state ID
  selectedCountry: null,
  selectedCountryId: null, // New state property to store the selected country ID
  cityname: null,
  cityId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.mode = action.payload; // Set the mode when opening the modal
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = null;
      state.cityname = null;
      state.selectedState = null;
      state.selectedStateId = null; // Reset selectedStateId when closing the modal
      state.selectedCountry = null;
      state.selectedCountryId = null; // Reset selectedCountryId when closing the modal
    },
    setStateData(state, action) {
      // console.log(action.payload) 
      state.stateData = action.payload;
    },
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
    },
    setSelectedStateId: (state, action) => {
      state.selectedStateId = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSelectedCountryId: (state, action) => {
      state.selectedCountryId = action.payload;
    },
    setCityName: (state, action) => {
      state.cityname = action.payload;
    },
    setSelectedCityId: (state, action) => {
      console.log(action.payload)
      state.cityId = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setStateData,
  setSelectedState,
  setSelectedStateId,
  setSelectedCountry,
  setSelectedCountryId,
  setSelectedCityId,
  setCityName,
} = modalSlice.actions;
export default modalSlice.reducer;
