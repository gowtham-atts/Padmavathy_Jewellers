import customerService from '../../services/customerService';
import locationService from '../../services/locationService';
import { setCityData, setCountryData, setProfileDetails, setSelectedBase64Image, setStateData } from './profileSlice';
import { getData } from '../../utils/storage';



export const fetchCustomerDetails = () => async (dispatch) => {
  const customerId = await getData('customerId');
  const payload = {
    id_customer: customerId,
  };
  try {
    const response = await customerService.getCustomerByID(payload);
    const getImage = `${response?.urlprofile ?? ''}${response?.cus_img ?? ''}`;
    dispatch(setProfileDetails(response));
    dispatch(setSelectedBase64Image(getImage))
  } catch (error) {
    console.error('Error fetching customer details', error);
  }
};

export const updateImage = (payload) => async (dispatch) => {
  try {
    const response = await customerService.uploadImage(payload);
    dispatch(setSelectedBase64Image(payload.profile_image));
  } catch (error) {
    console.error('Error updating Image', error);
  }
};


export const updateCustomerDetails = (payload) => async (dispatch) => {
  try {
    const response = await customerService.updateCustomer(payload);
    dispatch(fetchCustomerDetails(payload.id_customer));
    dispatch(updateImage({ id_customer: payload.id_customer, profile_image: payload.selectedImage }));
  } catch (error) {
    console.error('Error updating customer details', error);
  }
};


export const fetchCountryData = () => async (dispatch) => {
    try {
      const response = await locationService.getAllCountry();
      dispatch(setCountryData(response));
    } catch (error) {
      console.error('Error fetching countries', error);
    }
  };
  
  export const fetchStateData = (countryId) => async (dispatch) => {
    const payload = {
      id_country: countryId,
    };
    try {
      const response = await locationService.getAllState(payload);
      dispatch(setStateData(response));
    } catch (error) {
      console.error('Error fetching states', error);
    }
  };
  
  export const fetchCityData = (stateId) => async (dispatch) => {
    const payload = {
      id_state: stateId,
    };
    try {
      const response = await locationService.getAllCity(payload);
      dispatch(setCityData(response));
    } catch (error) {
      console.error('Error fetching cities', error);
    }
  };
