import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import alertSlice from './alertSlice';
import deliveryDetailsSlice from './deliveryDetailsSlice';
import requisitionSlice from './requisitionSlice'
const rootReducer = combineReducers({
  user: userReducer,
  alert: alertSlice,
  deliveryDetails: deliveryDetailsSlice,
  requisition:requisitionSlice
});

export default rootReducer;
