import axios from 'axios';
import api from './api'; 
import * as apiEndpoints from './apiEndpoints';
import { getData } from '../utils/storage';



const customerService = {
  
  getCustomerByID: async (payload) => {
    try {
      const token = await getData("userToken");
      const header_dict = {
       'Content-Type': 'application/json',
       'authorization': `${token}`, 
      }
      const apiUrl = axios.create({
           baseURL: apiEndpoints.API_BASE_URL,
           headers: header_dict
       });
      const response = await apiUrl.post(apiEndpoints.GET_CUSTOMER_BY_ID,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCustomer : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.put(apiEndpoints.UPDATE_CUSTOMER,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  uploadImage : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.UPLOAD_IMAGE,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  changePassword : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.CHANGE_PASSWORD,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  customerEnquiry : async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.CREATE_CUSTOMER_ENQUIRY,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};


export default customerService;
