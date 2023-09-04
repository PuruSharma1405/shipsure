import { OrderSummaryState } from '@/features/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";




const initialState: OrderSummaryState = {
    VccShortCode: '',
    VesselId: '',
    OrdStage: '',
    AccountingCompanyId: '',
    OrderName: '',
    AccountId: '',
    OrderType: '',
    OrderPriority: '',
    ExpectedPortId: '',
    ExpectedDeliveryDate: '',
    SparePartTypeId: '',
    IsHazardousMaterial: 0,
    EquipmentId: '',
    OrderNotes: '',
    ProjectId: '',
    DepartmentId: '',
    IsRequisitionAuthorised: '',
    CertificateRequired: '',
    CatalogId: '',
    ApplicableForDryDock: '',
    PatIdPriorityReason: '',
    PriorityJustification: '',
    ClaimsId: '',
    CrewRankId: '',
    General1Id: '',
    General3Id: '',
    NationalityId: '',
    SeasonalId: '',
    OrdAuxvessel: '',
    CatalogueSource: '',
    CatalogueSourceId: '',
    UserId: '',
    OrderLinesXML: [],
    RoleIdentifier: ''
};

export const orderSummarySlice = createSlice({
  name: 'orderSummary',
  initialState,
  reducers: {
    setOrderDeliveryState: (state, action) => {
      state.VccShortCode = action.payload.deliveryDate;
      state.VesselId = action.payload.VesselId;
      state.OrdStage = action.payload.OrdStage;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.orderSummary,
      };
    },
  },
});

export const selectOrderSummaryState = (state: any) => state.orderSummary;

export const { setOrderDeliveryState } = orderSummarySlice.actions;

export default orderSummarySlice.reducer;
