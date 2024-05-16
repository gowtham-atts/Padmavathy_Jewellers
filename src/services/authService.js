import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api'; 
import * as apiEndpoints from './apiEndpoints';
import axios from 'axios';
import { getData } from '../utils/storage';


const AUTH_TOKEN_KEY = 'authToken';

// Mock user authentication state for demonstration purposes
let isAuthenticated = false;

const authService = {
  login: async (username, password, id_branch, external_id) => {
    try {
      // Call the loginUser API method
      const response = await api.post(apiEndpoints.LOGIN_ENDPOINT, { username, password, id_branch, external_id });
      // For simplicity, assuming a successful login if no error is thrown
      isAuthenticated = true;
      // Store authentication token in AsyncStorage
      if (response.data.access_token != null) {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(response.data.access_token));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // Call any necessary API method to log out (e.g., invalidate tokens)
      await api.post(apiEndpoints.LOGOUT_ENDPOINT);
      // Reset authentication state
      isAuthenticated = false;
      // Remove authentication token from AsyncStorage
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      // You might want to clear additional user data stored in AsyncStorage here
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: async () => {
    // Check if the user is authenticated by verifying the presence of the authentication token in AsyncStorage
    const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    isAuthenticated = authToken !== null;
    return isAuthenticated;
  },

  register: async (payload) => {
    try {
      // Call the loginUser API method
      const response = await api.post(apiEndpoints.REGISTER_ENDPOINT,payload);
      // For simplicity, assuming a successful login if no error is thrown
      // isAuthenticated = true;
      // // Store authentication token in AsyncStorage
      // await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.data.access_token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup_otp: async (payload) => {
    try {
      const response = await api.post(apiEndpoints.SIGN_UP_OTP, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  send_otp: async (username) => {
    try {
      const response = await api.post(apiEndpoints.SEND_OTP, {username});
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verify_otp: async (username,otpcode) => {
    try {
      const response = await api.post(apiEndpoints.VERIFY_OTP, { username,otpcode });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  reset_password: async (username,passwd,confirmpasswd) => {
    try {
      const response = await api.post(apiEndpoints.RESET_OTP, { username,passwd,confirmpasswd });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete_account: async (payload) => {
    try {
      const token = await getData("userToken");
      const apiUrl = axios.create({
          baseURL: apiEndpoints.API_BASE_URL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, 
          },
      });
      const response = await apiUrl.post(apiEndpoints.DELETE_ACCOUNT, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const storeCredentials = async (username, password, rememberMe) => {
  try {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);
    await AsyncStorage.setItem('rememberMe', JSON.stringify(rememberMe));
  } catch (error) {
    console.error('Error storing credentials:', error);
  }
};

export const clearCredentials = async () => {
  try {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('rememberMe');
  } catch (error) {
    console.error('Error clearing credentials:', error);
  }
};

export const deleteCredentials = async () => {
  try {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('rememberMe');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('mobile');
    await AsyncStorage.removeItem('loggedIn');
    await AsyncStorage.removeItem('customerId');
    await AsyncStorage.removeItem('branchId');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user_mobile');
    await AsyncStorage.removeItem('user_email');
  } catch (error) {
    console.error('Error deleting credentials:', error);
  }
};

export default authService;
