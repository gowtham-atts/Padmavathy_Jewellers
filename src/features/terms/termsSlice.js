import { createSlice } from '@reduxjs/toolkit';

const termsSlice = createSlice({
  name: 'terms',
  initialState: {
    image: '',
    title: '',
    termsCondition: [],
    enquiryDetails:{}
  },
  reducers: {
    setTermsCondition: (state, action) => {
      const { image, title, termsCondition } = action.payload;
      state.image = image;
      state.title = title;
      state.termsCondition = termsCondition;
    },
    setEnquiryDetails: (state, action) => {
      state.enquiryDetails = action.payload;
  },
  },
});

export const { setTermsCondition,setEnquiryDetails } = termsSlice.actions;

export const selectEnquiryState = (state) => state.terms; 

export default termsSlice.reducer;
