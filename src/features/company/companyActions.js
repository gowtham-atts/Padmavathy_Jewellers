import companyService from '../../services/companyService';
import { setCompanyDetails } from './companySlice';


export const fetchCompanyDetails = () => async (dispatch) => {
  try {
    const response = await companyService.getCompanyDetails();
    dispatch(setCompanyDetails(response));
  } catch (error) {
    console.error('Error fetching customer details', error);
  }
};


