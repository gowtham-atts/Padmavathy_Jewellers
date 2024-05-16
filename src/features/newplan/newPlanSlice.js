import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newPlan: null,
  joinScheme:{}
};

const newPlanSlice = createSlice({
  name: 'newplan',
  initialState,
  reducers: {
    setNewPlan: (state, action) => {
      state.newPlan = action.payload;
    },
    setJoinScheme: (state, action) => {
      state.joinScheme = action.payload;
    } 
  },
});

export const { setNewPlan, setJoinScheme } = newPlanSlice.actions;

export const selectNewPlan = (state) => state.newplan.newPlan;

export const selectJoinScheme = (state) => state.newplan.joinScheme;

export default newPlanSlice.reducer;
