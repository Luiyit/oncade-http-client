import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  InitiateVCPurchaseRequest,
  InitiateVCPurchaseResponse,
  CompleteVCPurchaseRequest,
  CompleteVCPurchaseResponse,
} from '../types';

export class VCPurchaseAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Initiate a virtual currency purchase
   * @param request - VC purchase initiation parameters
   * @returns Promise with purchase initiation response
   */
  async initiateVCPurchase(request: InitiateVCPurchaseRequest): Promise<InitiateVCPurchaseResponse> {
    if (!request.userId || !request.itemId || !request.currencyId) {
      throw new Error('User ID, item ID, and currency ID are required');
    }
    const response = await this.httpClient.post<InitiateVCPurchaseResponse>(
      '/v1/vc/purchases',
      request,
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * Complete a virtual currency purchase
   * @param request - VC purchase completion parameters
   * @returns Promise with purchase completion response
   */
  async completeVCPurchase(request: CompleteVCPurchaseRequest): Promise<CompleteVCPurchaseResponse> {
    if (!request.purchaseId) {
      throw new Error('Purchase ID is required');
    }
    const response = await this.httpClient.post<CompleteVCPurchaseResponse>(
      `/v1/vc/purchases/${request.purchaseId}`,
      {},
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }
}
