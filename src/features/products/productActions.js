import offerService from "../../services/offerService";
import { getData } from "../../utils/storage";
import { setGoldData } from "./productSlice";

export const fetchGoldRates = () => async (dispatch) => {
  let customerId = await getData('customerId');
  try {
    if (!customerId) {
        customerId = 0;
      }
      const payload = {
        id_customer: customerId,
      }
    const response = await offerService.getGoldRate(payload);
    dispatch(setGoldData(response));
  } catch (error) {
    console.log('Error fetching gold rates', error);
  }
};

