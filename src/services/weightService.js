import axios from 'axios';
import api from './api'; 
import * as apiEndpoints from './apiEndpoints';
import { getData } from '../utils/storage';



const weightService = {
  
  
  getWeight : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.GET_TOTAL_WEIGHT, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  viewWeight : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.VIEW_TOTAL_WEIGHT, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  
};


export default weightService;
