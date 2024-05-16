import api from './api'; 
import * as apiEndpoints from './apiEndpoints';



const categoryService = {
  

  getAllCategoryList : async (payload) => {
    try {
      const response = await api.post(apiEndpoints.GET_ALL_CATEGORIES,payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  
};


export default categoryService;
