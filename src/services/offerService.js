import api from './api'; 
import * as apiEndpoints from './apiEndpoints';



const offerService = {
  
  getOfferBanner: async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_OFFER_BANNER,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getGoldRate : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_GOLD_RATE,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMetalRate : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_METAL_RATE,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTodayOffer : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_TODAY_OFFER,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllOffer : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_All_OFFER,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllNewPlan : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_TODAY_OFFER,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getAllNewArrivals : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_NEW_ARRIVALS,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByIdOfferList : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_BY_ID_OFFER,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByIdNewArrivalList : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_BY_ID_ARRIVALS,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


};


export default offerService;
