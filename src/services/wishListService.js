import axios from 'axios';
import api from './api'; 
import * as apiEndpoints from './apiEndpoints';
import { getData } from '../utils/storage';



const wishListService = {
  
  getWishList: async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.GET_WISH_LIST,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateWishList: async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.UPDATE_WISH_LIST,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


};


export default wishListService;
