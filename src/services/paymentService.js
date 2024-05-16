import axios from 'axios';
import * as apiEndpoints from './apiEndpoints';
import { getData } from '../utils/storage';



const paymentService = {
  

    getAllPaymentHistory : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.GET_PAYMENT_HISTORY,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

    viewAllPaymentHistory : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.VIEW_PAYMENT_HISTORY,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

    schemePayment : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.SCHEME_PAYMENT,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

    sendPaymentDetails : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.PAYMENT_API,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

    successPayment : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.PAYMENT_SUCCESS,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

    failedPayment : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.PAYMENT_FAILED,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

  
    extendPayment : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.EXTEND_INSTALLMENT,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    
  
};


export default paymentService;
