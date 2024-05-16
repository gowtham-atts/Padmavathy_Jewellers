import { createSlice } from '@reduxjs/toolkit';

export const offerSlice = createSlice({
    name: 'offer',
    initialState: {
        offerDetails: null,
        selectedOfferDetails: null,
        wishlist: false,
        selectedArrivalsDetails:null
    },
    reducers: {
        setOfferDetails: (state, action) => {
            state.offerDetails = action.payload;
        },
        setSelectedOfferDetails: (state, action) => {
            state.selectedOfferDetails = action.payload;
        },
        setSelectedNewArrivals : (state, action) => {
            state.selectedArrivalsDetails = action.payload;
        }, 
    },
});

export const {  setOfferDetails, setSelectedOfferDetails, setSelectedNewArrivals } = offerSlice.actions;

export const selectOfferState = (state) => state.offer; 

export const selectedOffers = (state) => state.offer.selectedOfferDetails; 

export const selectedNewArrivals = (state) => state.offer.selectedArrivalsDetails; 

export default offerSlice.reducer;