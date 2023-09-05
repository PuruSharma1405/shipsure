import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemName: "",
  coyId:"",
  vesId: "",
};

export const requisitionSlice = createSlice({
  name: "requisition",
  initialState: initialState,
  reducers: {
    setItemName(state, value) {
      state.itemName = value.payload;
    },
    setVesId(state, value) {
      state.vesId = value.payload;
    },
    setCoyId(state, value) {
      state.coyId = value.payload;
    },
  },
});

export const { setItemName, setVesId, setCoyId } = requisitionSlice.actions;

export default requisitionSlice.reducer;
