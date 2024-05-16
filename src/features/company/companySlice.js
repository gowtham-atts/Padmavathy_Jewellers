import { createSlice } from '@reduxjs/toolkit';

const companyDetailsSlice = createSlice({
  name: 'companyDetail',
  initialState: {
    companyDetails: null,
    error: null,
  },
  reducers: {
    setCompanyDetails: (state, action) => {
      state.companyDetails = action.payload;
      state.error = null;
    },
    setCompanyError: (state, action) => {
      state.companyDetails = null;
      state.error = action.payload;
    },
  },
});

export const { setCompanyDetails, setCompanyError } = companyDetailsSlice.actions;

export const selectCompanyDetails = (state) => state.companyDetail.companyDetails;

export default companyDetailsSlice.reducer;
