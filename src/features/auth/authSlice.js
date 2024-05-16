import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
  isAuthenticated: false,
  skipLogin:false,
  createAccount:'',
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; 
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setSkipLogin : (state, action) => {
      state.skipLogin = action.payload;
    },
    setCreateAccount : (state, action) => {
      state.createAccount = action.payload;;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setSkipLogin, setCreateAccount, setLoading } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsSkipLogin = (state) => state.auth.skipLogin;
export const selectCreateAccount = (state) => state.auth.createAccount;
export const selectLoading = (state) => state.auth.isLoading;



export default authSlice.reducer;
