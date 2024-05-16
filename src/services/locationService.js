import api from './api'; 
import * as apiEndpoints from './apiEndpoints';



const locationService = {
  

  getAllCountry : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_ALL_COUNTRY,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllState : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_ALL_STATE,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllCity : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_ALL_CITY,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
  getAllRelation : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_ALL_RELATION,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
  getAllBranch : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_ALL_BRANCH,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  
};


export default locationService;
