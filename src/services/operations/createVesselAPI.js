import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis"

const{SPARE_PART_DETAILS_API}=endpoints;

export async function getVesselPart(item,token){
    console.log('item,token',item,token);
    try{
        const response=await apiConnector("GET",SPARE_PART_DETAILS_API+`?OrderType=${item}`,null,{
            Authorization: `Bearer ${token}`,
          })

        console.log('response',response);

        if(!response.data.success) {
            throw new Error(response.data.message);
          }
    }catch(error){
        console.log('error',error);
    }
}

export async function getVesselItems(item,token){
    try {
        const response = await axios.get(
          'http://192.168.201.232:3012/purch-attribute-lookup-code?LookupCode=VesselRequisitionOrderType',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRadioItems(response?.data?.result?.recordset)
      } catch (error) {
        console.error('Error:', error);
      }
}