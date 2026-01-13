import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  CreateCashoutRequest,
  CreateCashoutResponse,
  ListCashoutsRequest,
  ListCashoutsResponse,
  ApproveCashoutRequest,
  ApproveCashoutResponse,
  CancelCashoutRequest,
  CancelCashoutResponse,
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
      '/v1/cashouts',
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
      '/v1/cashouts',
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
    if (!request.cashoutId) {
      throw new Error('Cashout ID is required');
    }
    const response = await this.httpClient.post<ApproveCashoutResponse>(
      `/v1/cashouts/${request.cashoutId}/approve`,
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
   * Cancel a cashout
   * @param request - Cancel cashout parameters
   * @returns Promise with cancelled cashout response
   */
  async cancelCashout(request: CancelCashoutRequest): Promise<CancelCashoutResponse> {
    if (!request.cashoutId) {
      throw new Error('Cashout ID is required');
    }
    const response = await this.httpClient.post<CancelCashoutResponse>(
      `/v1/cashouts/${request.cashoutId}/cancel`,
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

