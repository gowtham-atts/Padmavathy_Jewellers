import api from './api'; 
import * as apiEndpoints from './apiEndpoints';



const productService = {
  
  ourProductList: async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_OUR_PRODUCTS,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllProductList : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_ALL_PRODUCTS,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByIdProductList : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_BY_ID_PRODUCT,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  
};


export default productService;
