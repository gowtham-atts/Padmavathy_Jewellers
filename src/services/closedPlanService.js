import axios from 'axios';
import { getData } from '../utils/storage';
import api from './api'; 
import * as apiEndpoints from './apiEndpoints';



const closedPlanService = {
  
  
  getClosedPlans : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
          },
      });
      const response = await apiUrl.post(apiEndpoints.GET_CLOSED_PLAN,  payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  viewClosedPlans : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
          },
      });
      const response = await apiUrl.post(apiEndpoints.VIEW_CLOSED_PLAN,  payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  
};

export default closedPlanService;
