export interface SparePartTypes {
  SptCode: string;
  SptDescription: string;
  SptId: string;
  SptName: string;
  OSP_OrderType: string;
}

export interface OrderLineItems {
  ROD_ID: string;
  VIV_ID: string;
  ROD_QuantityRequested: number;
  ROD_QuantityEnquired: number;
  PTR_ID: string;
  ACC_ID: number;
}

// export interface OrderSummaryState {
//   VccShortCode: string;
//   VesselId: string;
//   OrdStage: string;
//   AccountingCompanyId: string;
//   OrderName: string;
//   AccountId: string;
//   OrderType: string;
//   OrderPriority: string;
//   ExpectedPortId: string;
//   ExpectedDeliveryDate: string;
//   SparePartTypeId: string;
//   IsHazardousMaterial: number;
//   EquipmentId: string;
//   OrderNotes: string;
//   ProjectId: string;
//   DepartmentId: string;
//   IsRequisitionAuthorised: string;
//   CertificateRequired: string;
//   CatalogId: string;
//   ApplicableForDryDock: string;
//   PatIdPriorityReason: string;
//   PriorityJustification: string;
//   ClaimsId: string;
//   CrewRankId: string;
//   General1Id: string;
//   General3Id: string;
//   NationalityId: string;
//   SeasonalId: string;
//   OrdAuxvessel: string;
//   CatalogueSource: string;
//   CatalogueSourceId: string;
//   UserId: string;
//   OrderLinesXML: Array<OrderLineItems>;
//   RoleIdentifier: string;
// }
