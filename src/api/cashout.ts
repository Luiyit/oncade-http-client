import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  CreateCashoutRequest,
  CreateCashoutResponse,
  ListCashoutsRequest,
  ListCashoutsResponse,
  ApproveCashoutRequest,
  ApproveCashoutResponse,
  RejectCashoutRequest,
  RejectCashoutResponse,
} from '../types';

export class CashoutAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Create a cashout request
   * @param request - Cashout creation parameters
   * @returns Promise with cashout response
   */
  async createCashout(request: CreateCashoutRequest): Promise<CreateCashoutResponse> {
    if (!request.currencyId || !request.userRef || !request.amount || !request.destinationAddress) {
      throw new Error('All required fields must be provided for cashout creation');
    }
    const response = await this.httpClient.post<CreateCashoutResponse>(
      '/v1/vc/cashouts',
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
   * List cashouts
   * @param request - List cashouts request parameters
   * @returns Promise with cashouts response
   */
  async listCashouts(request?: ListCashoutsRequest): Promise<ListCashoutsResponse> {
    const response = await this.httpClient.get<ListCashoutsResponse>(
      '/v1/vc/cashouts',
      { params: request }
    );
    return response.data;
  }

  /**
   * Approve a cashout
   * @param request - Approve cashout parameters
   * @returns Promise with approved cashout response
   */
  async approveCashout(request: ApproveCashoutRequest): Promise<ApproveCashoutResponse> {
    if (!request.cashoutRequestId) {
      throw new Error('Cashout request ID is required');
    }
    const response = await this.httpClient.post<ApproveCashoutResponse>(
      `/v1/vc/cashouts/${request.cashoutRequestId}/approve`,
      {},
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * Reject a cashout
   * @param request - Reject cashout parameters
   * @returns Promise with rejected cashout response
   */
  async rejectCashout(request: RejectCashoutRequest): Promise<RejectCashoutResponse> {
    if (!request.cashoutRequestId) {
      throw new Error('Cashout request ID is required');
    }
    const response = await this.httpClient.post<RejectCashoutResponse>(
      `/v1/vc/cashouts/${request.cashoutRequestId}/reject`,
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

