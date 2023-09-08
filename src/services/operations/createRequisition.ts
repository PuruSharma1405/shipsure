import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { CREATE_REQUISITION } = endpoints;

export async function createRequisition(token: string, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await apiConnector("POST", CREATE_REQUISITION, body, {
                Authorization: `Bearer ${token}`,
            }, null);

            console.log('response', response);

            if (response.statusText !== 'Created') {
                throw new Error(response.data.message);
            }
            resolve(response.data);
        } catch (error) {
            reject(error);
            console.log('error', error);
        }
    })
}