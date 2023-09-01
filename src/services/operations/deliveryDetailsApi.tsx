import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { GET_PORTS } = endpoints;

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    PRTName?: string;
}

export async function getPortList(token: string, params: IPagination | any): any {
  try {
    const response = await apiConnector("GET", GET_PORTS, null, {
      Authorization: `Bearer ${token}`,
    }, params);

    console.log('response', response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response
  } catch (error) {
    console.log('error', error);
  }
}
