import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import alertSlice from './alertSlice';
import deliveryDetailsSlice from './deliveryDetailsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertSlice,
  deliveryDetails: deliveryDetailsSlice
});

export default rootReducer;
