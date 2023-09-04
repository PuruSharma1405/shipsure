import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemName: "",
  coyId:"",
  vesId: "",
  vivItems: [],
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
    setVivItems(state, action) {
      state.vivItems = action.payload;
    },
  },
});

export const { setItemName,setVesId,setCoyId,setVivItems } = requisitionSlice.actions;

export default requisitionSlice.reducer;
