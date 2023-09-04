import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemName: "",
  coyId:"",
  vesId: "",
};

const requisitionSlice = createSlice({
  name: "requisition",
  initialState: initialState,
  reducers: {
    setItemName(state, value) {
      state.itemName = value.payload;
    },
    setVesId(state, value) {
      state.loading = value.payload;
    },
    setCoyId(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setItemName } = requisitionSlice.actions;

export default requisitionSlice.reducer;
