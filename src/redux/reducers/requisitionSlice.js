import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemName: "",
  coyId:"",
  vesId: "",
  itemsDetails:[],
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

console.log('itemsDetails',initialState);

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
    setItemsDetails(state,value){
      state.itemsDetails=value.payload
    },
    setOrderDetails(state, value) {
      state.accountCode = value.payload.accountCode?.value ? value.payload.accountCode.value : null
      state.sparePartType = value.payload.sparePartType?.value ? value.payload.sparePartType.value : null
      state.fastTrackPriorityReason = value.payload.fastTrackPriorityReason?.value ? value.payload.fastTrackPriorityReason.value : null
      state.urgentPriorityReason = value.payload.urgentPriorityReason?.value ? value.payload.urgentPriorityReason.value : null
      state.department = value.payload.department?.value ? value.payload.department.value : null
      state.insuranceClaim = value.payload.insuranceClaim?.value ? value.payload.insuranceClaim.value : null
      state.seasonal = value.payload.seasonal?.value ? value.payload.seasonal.value : null
      state.nationality = value.payload.nationality?.value ? value.payload.nationality.value : null
      state.rank = value.payload.rank?.value ? value.payload.rank.value : null
      state.vesselAux = value.payload.vesselAux?.value ? value.payload.vesselAux.value : null
      state.general1 = value.payload.general1?.value ? value.payload.general1.value : null
      state.general2 = value.payload.general2?.value ? value.payload.general2.value : null
      state.projects = value.payload.projects?.value ? value.payload.projects.value : null
      state.justification = value.payload.justification
    }
  },
});

export const selectRequisitionState = (state) => state.requisition;

export const { setItemName, setVesId, setCoyId, setItemsDetails,setOrderDetails } = requisitionSlice.actions;

export default requisitionSlice.reducer;
