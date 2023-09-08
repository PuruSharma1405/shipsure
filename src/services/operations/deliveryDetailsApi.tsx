import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { OTHER_PORT_LIST, POSITION_LIST, HOME_PORT_LIST, SPARE_PART_DETAILS_API, GET_DEPARTMENTS, GET_ACCOUNT_CODE, 
  GET_PURCH_ATTRIBUT_LOOKUP_CODE, INSURANCE_CLAIM_COYID, GET_AUX_LIST, GET_NATIONALITY_LIST, GET_CREW_RANK_LIST, GET_VESSEL_AUX_LIST, 
  GET_PROJECTS_LIST, GET_AUX_FOR_VESSEL } = endpoints;

export interface IPagination {
  PageNumber?: number;
  PageSize?: number;
  PRTName?: string;
}

export async function getOtherPortList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", OTHER_PORT_LIST, null, {
        Authorization: `Bearer ${token}`,
      }, params);
  
      console.log('response', response);
  
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      resolve(response.data);
    } catch (error) {
      reject(error);
      console.log('error', error);
    }
  })
}
export async function getHomeList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", HOME_PORT_LIST, null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response)
    } catch (error) {
      reject(error);
    }
  })
}
export async function getPositionList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", POSITION_LIST, null, {
        Authorization: `Bearer ${token}`,
      }, params);
  
      console.log('response', response);
  
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
  
      resolve(response)
    } catch (error) {
      reject(error);
      console.log('error', error);
    }
  })
}

export async function getSparePartList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", SPARE_PART_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getDepartmentList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_DEPARTMENTS + '?IsValidPO=1', null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getAccountCode(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_ACCOUNT_CODE, null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getPurchAttributCode(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_PURCH_ATTRIBUT_LOOKUP_CODE , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getInsuranceClaimCoyid(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", INSURANCE_CLAIM_COYID , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getAuxList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_AUX_LIST , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getNationalityList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_NATIONALITY_LIST , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getCrewRankList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_CREW_RANK_LIST , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getVesselAUXList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_VESSEL_AUX_LIST , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getProjectsList(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_PROJECTS_LIST , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}

export async function getAuxForVessel(token: string, params: IPagination | any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiConnector("GET", GET_AUX_FOR_VESSEL , null, {
        Authorization: `Bearer ${token}`,
      }, params);

      console.log('response', response);

      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }

      resolve(response.data)
    } catch (error) {
      reject(error);
    }
  })
}
