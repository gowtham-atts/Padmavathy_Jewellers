import { createSlice } from '@reduxjs/toolkit';

const payEMISlice = createSlice({
  name: 'payEMI',
  initialState: {
    payEMIData: [],
    error: null,
    extendSchemeData:[]
  },
  reducers: {
    setPayEMIData: (state, action) => {
      state.payEMIData = action.payload;
      state.error = null;
    },
    setPayEMIError: (state, action) => {
      state.payEMIData = null;
      state.error = action.payload;
    },
    setExtendScheme: (state, action) => {
      state.extendSchemeData = action.payload;
    }
  },
});

export const { setPayEMIData, setPayEMIError, setExtendScheme } = payEMISlice.actions;

export const selectExtendScheme = (state) => state.payEMI.extendSchemeData;

export const selectPayEMA = (state) => state.payEMI.payEMIData;

export default payEMISlice.reducer;
