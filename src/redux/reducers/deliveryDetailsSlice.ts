import { createSlice } from '@reduxjs/toolkit';
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export interface DeliveryDetailsState {
    deliveryDate: string;
    deliveryPort: string;
    notes: string;
}


const initialState: DeliveryDetailsState = {
  deliveryDate: '',
  deliveryPort: '',
  notes: '',
};

export const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState,
  reducers: {
    setDeliveryDetailsState: (state, action) => {
      state.deliveryDate = action.payload.deliveryDate;
      state.deliveryPort = action.payload.deliveryPort;
      state.notes = action.payload.notes;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.deliveryDetails,
      };
    },
  },
});

export const deliveryDetailsState = (state: AppState) => state.deliveryDetails;

export const { setDeliveryDetailsState } = deliveryDetailsSlice.actions;

export default deliveryDetailsSlice.reducer;
