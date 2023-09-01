import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { OTHER_PORT_LIST, POSITION_LIST, HOME_PORT_LIST } = endpoints;

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
