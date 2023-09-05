import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemName: "",
  coyId:"",
  vesId: "",
  accountCode: '',
  sparePartType: '',
  fastTrackPriorityReason: '',
  urgentPriorityReason: '',
  department: '',
  insuranceClaim: '',
  seasonal: '',
  nationality: '',
  rank: '',
  vesselAux: '',
  general1: '',
  general2: '',
  projects: '',
  justification: '',
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
    setOrderDetails(state, value) {
      state.accountCode = value.accountCode
      state.sparePartType = value.sparePartType
      state.fastTrackPriorityReason = value.fastTrackPriorityReason
      state.urgentPriorityReason = value.urgentPriorityReason
      state.department = value.department
      state.insuranceClaim = value.insuranceClaim
      state.seasonal = value.seasonal
      state.nationality = value.nationality
      state.rank = value.rank
      state.vesselAux = value.vesselAux
      state.general1 = value.general1
      state.general2 = value.general2
      state.projects = value.projects
      state.justification = value.justification
    }
  },
});

export const selectRequisitionState = (state) => state.requisition;

export const { setItemName, setVesId, setCoyId, setOrderDetails } = requisitionSlice.actions;

export default requisitionSlice.reducer;
