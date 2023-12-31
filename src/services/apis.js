const BASE_URL="http://192.168.201.232:3012";
const VESSEL_BASE_URL="http://192.168.201.232:3002";
const ACCOUNT_BASE_URL="http://192.168.201.232:3003";

export const endpoints={
    SPARE_PART_DETAILS_API:BASE_URL+"/spare-part-details",
    GET_DEPARTMENTS:BASE_URL+"/department-list",
    GET_PURCH_ATTRIBUT_LOOKUP_CODE: BASE_URL+"/purch-attribute-lookup-code",
    GET_VESSEL_AUX_LIST: BASE_URL+"/vessel-aux-list-paged",
    GET_PROJECTS_LIST: BASE_URL+"/project-lookup",

    GET_ACCOUNT_CODE :ACCOUNT_BASE_URL+"/vessel-account-codes",
    GET_AUX_LIST :ACCOUNT_BASE_URL+"/general-aux-list",
    GET_NATIONALITY_LIST :ACCOUNT_BASE_URL+"/nationality",
    GET_CREW_RANK_LIST :ACCOUNT_BASE_URL+"/crew-rank-list",

    VESSEL_ITEMS:BASE_URL+"purch-attribute-lookup-code?LookupCode=VesselRequisitionOrderType",
    POSITION_LIST: VESSEL_BASE_URL+"/vessel-position-requisition",
    HOME_PORT_LIST: VESSEL_BASE_URL+"/procurement-setup-for-requisition",
    OTHER_PORT_LIST: VESSEL_BASE_URL+"/ports",
    INSURANCE_CLAIM_COYID: VESSEL_BASE_URL+"/insurance-claim-coyid",
    GET_AUX_FOR_VESSEL: VESSEL_BASE_URL+"/aux-for-vessel",
}