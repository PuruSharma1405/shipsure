import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import alertSlice from './alertSlice';

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertSlice
});

export default rootReducer;
