import { createSlice } from '@reduxjs/toolkit';


export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categtories: [],
    selectedCategoryId:null
  },
  reducers: {
    addCategoriess: (state, action) => {
      state.products.push(action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCategories: (state, action) => {
      state.products = action.payload;
    },
    setSelectedCategoryId: (state, action) => {
      state.selectedProductId = action.payload;
    }
  },
});


export const { addCategoriess, setFilter, setCategories, setSelectedCategoryId } = categorySlice.actions;
export const selectFilter = (state) => state.category.filter;
export const selectCategories = (state) => state.category.categtories;
export const selectSelectedCategoryId = (state) => state.category.selectedCategoryId;


export default categorySlice.reducer;
