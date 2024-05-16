import newPlanService from '../../services/newPlanService';
import { getData } from '../../utils/storage';
import { setPayEMIData } from './payEMISlice';


export const fetchPayEMI = () => async (dispatch) => {
  const customerId = await getData('customerId');
  try {
    const payload = {
      id_customer: customerId,
    };
    const response = await newPlanService.getPayEMI(payload)
    dispatch(setPayEMIData(response));
  } catch (error) {
    console.error('Error fetching pay emi', error);
  }
};

