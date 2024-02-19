import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './stateSlice';
import modalReducer from './modalstateSlice';
import countryReducer from './dropcountry';
import cityReducer from './citySlice'; // Import the city reducer
import cityModal from './modalCitySlice'

const store = configureStore({
  reducer: {
    state: stateReducer,
    modal: modalReducer,
    country: countryReducer,
    city: cityReducer, // Add the city reducer to the store
    cityModal:cityModal,
  },
});

export default store;
