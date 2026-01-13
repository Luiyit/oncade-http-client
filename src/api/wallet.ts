import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  GetUserBalanceRequest,
  GetUserBalanceResponse,
  GetWithdrawLinkRequest,
  GetWithdrawLinkResponse,
  InitiateWalletPurchaseRequest,
  InitiateWalletPurchaseResponse,
  GetWalletPurchaseRequest,
  GetWalletPurchaseResponse,
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

  /**
   * Initiate wallet purchase
   * @param request - Wallet purchase initiation parameters
   * @returns Promise with wallet purchase response
   */
  async initiateWalletPurchase(request: InitiateWalletPurchaseRequest): Promise<InitiateWalletPurchaseResponse> {
    if (!request.userId || !request.itemId) {
      throw new Error('User ID and item ID are required');
    }
    const response = await this.httpClient.post<InitiateWalletPurchaseResponse>(
      '/v1/wallet/purchase',
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
   * Get wallet purchase details
   * @param request - Wallet purchase details parameters
   * @returns Promise with wallet purchase details response
   */
  async getWalletPurchase(request: GetWalletPurchaseRequest): Promise<GetWalletPurchaseResponse> {
    if (!request.purchaseId) {
      throw new Error('Purchase ID is required');
    }
    const response = await this.httpClient.get<GetWalletPurchaseResponse>(
      `/v1/wallet/purchase/${request.purchaseId}`
    );
    return response.data;
  }

}