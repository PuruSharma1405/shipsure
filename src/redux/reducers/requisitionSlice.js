import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemName:''
  };
  
  const requisitionSlice=createSlice({
      name: "requisition",
      initialState: initialState,
      reducers: {
          setItemName(state, value) {
          console.log('itemNamestate',itemName);
        state.itemName = value.payload;
      }
    },
  });
  
  export const  {setItemName}  = requisitionSlice.actions;
  
  export default requisitionSlice.reducer;