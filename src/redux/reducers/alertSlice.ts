// src/store/alertSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from "../store";
import { AlertProps } from '@mui/material';
import { HYDRATE } from "next-redux-wrapper";

export interface AlertState {
    open: boolean;
    message: string;
    severity: AlertProps['severity'];
}


const initialState: AlertState = {
  open: false,
  message: '',
  severity: 'info',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideAlert: (state) => {
      state.open = false;
      state.message = '';
      state.severity = 'info';
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.alert,
      };
    },
  },
});

export const selectAlertState = (state: AppState) => state.alert;

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
