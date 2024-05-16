import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as apiEndpoints from './apiEndpoints'; 

const api = axios.create({
  baseURL: apiEndpoints.API_BASE_URL,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_TOKEN_KEY = 'authToken';

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

export default api;
