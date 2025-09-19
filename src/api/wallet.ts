import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  GetUserBalanceRequest,
  GetUserBalanceResponse,
  GetWithdrawLinkRequest,
  GetWithdrawLinkResponse,
} from '../types';

export class WalletAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get user balance
   * @param request - Balance request parameters
   * @returns Promise with balance response
   */
  async getUserBalance(request: GetUserBalanceRequest): Promise<GetUserBalanceResponse> {
    if (!request.userId) {
      throw new Error('User ID is required');
    }
    const response = await this.httpClient.post<GetUserBalanceResponse>(
      '/v1/wallet/balance',
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
   * Get withdraw link
   * @param request - Withdraw link request parameters
   * @returns Promise with withdraw link response
   */
  async getWithdrawLink(request: GetWithdrawLinkRequest): Promise<GetWithdrawLinkResponse> {
    if (!request.userId) {
      throw new Error('User ID is required');
    }
    const response = await this.httpClient.post<GetWithdrawLinkResponse>(
      '/v1/wallet/manage',
      request,
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

}