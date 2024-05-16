import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    customerDetails: null,
    selectedImage: null,
    countryData: [],
    stateData: [],
    cityData: [],
  },
  reducers: {
    setProfileDetails: (state, action) => {
      state.customerDetails = action.payload;
    },
    setSelectedBase64Image: (state, action) => {
      state.selectedImage = action.payload;
    },
    setCountryData: (state, action) => {
      state.countryData = action.payload;
    },
    setStateData: (state, action) => {
      state.stateData = action.payload;
    },
    setCityData: (state, action) => {
      state.cityData = action.payload;
    },
  },
});

export const {
  setProfileDetails,
  setSelectedBase64Image,
  setCountryData,
  setStateData,
  setCityData,
} = profileSlice.actions;

export const selectProfileDetails = (state) => state.profile.customerDetails;

export const selectBase64Image = (state) => state.profile.selectedImage;


export default profileSlice.reducer;
