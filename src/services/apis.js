const BASE_URL="http://192.168.201.232:3012";
const VESSEL_BASE_URL="http://192.168.201.232:3002";

export const endpoints={
    SPARE_PART_DETAILS_API:BASE_URL+"/spare-part-details",
    POSITION_LIST: VESSEL_BASE_URL+"/vessel-position-requisition",
    HOME_PORT_LIST: VESSEL_BASE_URL+"/procurement-setup-for-requisition",
    OTHER_PORT_LIST: VESSEL_BASE_URL+"/ports",
}