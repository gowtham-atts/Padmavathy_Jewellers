import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from './products/productSlice';
import categoryReducer from './categories/categorySlice';
import termsReducer from './terms/termsSlice';
import notificationReducer from './notifications/notificationSlice';
import profileReducer from './profile/profileSlice';
import payEMIReducer from './payEMI/payEMISlice';
import companyReducer from './company/companySlice';
import offerReducer from './offers/offerSlice';
import newPlanSlice from './newplan/newPlanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    newplan :newPlanSlice,
    product: productReducer,
    category: categoryReducer,
    terms:termsReducer,
    notification:notificationReducer,
    profile:profileReducer,
    payEMI: payEMIReducer,
    companyDetail:companyReducer,
    offer: offerReducer
  },
});
