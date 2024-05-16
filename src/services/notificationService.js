import axios from 'axios';
import api from './api'; 
import * as apiEndpoints from './apiEndpoints';
import { getData } from '../utils/storage';



const notificationService = {
  

      getAllNotification : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.GET_ALL_NOTIFICATION,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      getNotifyCount : async (payload) => {
        try {
          const response = await api.post(apiEndpoints.GET_NOTIFY_COUNT,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      updateMarkReadAll : async (payload) => {
        try {
          const response = await api.post(apiEndpoints.UPDATE_MARK_READ_ALL,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      updateSingleRead : async (payload) => {
        try {
          const response = await api.post(apiEndpoints.UPDATE_SINGLE_READ,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      notificationStatusChange : async (payload) => {
        try {
          const token = await getData("userToken");
          const apiUrl = axios.create({
              baseURL: apiEndpoints.API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, 
              },
          });
          const response = await apiUrl.post(apiEndpoints.NOTIFICATION_STATUS,payload);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
  
  

};


export default notificationService;
