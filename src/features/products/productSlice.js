import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    selectedTab: 'all',
    products: null,
    categories: [],
    productDetails: null,
    selectedProductDetails:null,
    offerDetails: null,
    newArrivalDetails:null,
    wishlist: 0,
    wishlistData:[],
    goldRates:{},
    prevGoldRates:{},
    goldData:{}
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setSelectedProductDetails: (state, action) => {
      state.selectedProductDetails = action.payload;
    },
    setOfferDetails: (state, action) => {
      state.offerDetails = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlistData = action.payload;
    },
    toggleWishlist: (state) => {
      state.wishlist = !state.wishlist;
    },
    setGoldRateDetails: (state, action) => {
      state.goldRates = action.payload;
    },
    setPrevGoldDetails:(state, action) => {
      state.prevGoldRates = action.payload;
    },
    setGoldData : (state, action) => {
      state.goldData = action.payload;
    }
  }
});

export const { setSelectedTab, setProducts, setCategories, setProductDetails,
               setOfferDetails,toggleWishlist,setWishlist,setGoldRateDetails,
               setPrevGoldDetails, setSelectedProductDetails, setGoldData } = productSlice.actions;

export const selectProductState = (state) => state.product; 

export const selectCategoryState = (state) => state.product.categories;

export const selectOfferState = (state) => state.product;

export const selectNewArrivalState = (state) => state.product.newArrivalDetails;

export const selectGoldRateState = (state) => state.product.goldRates; 

export const selectPrevGoldRateState = (state) => state.product.prevGoldRates; 

export const selectedProducts = (state) => state.product.selectedProductDetails; 

export const selectGoldData = (state) => state.product.goldData;


export default productSlice.reducer;