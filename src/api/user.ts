import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  UserLinkInitiateRequest,
  UserLinkInitiateResponse,
  GetUserPurchasesRequest,
  GetUserPurchasesResponse,
  GetUserInfoRequest,
  GetUserInfoResponse,
} from '../types';

export class UserAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Initiate account link for a user
   * @param request - Account link initiation parameters
   * @returns Promise with initiation response
   */
  async linkInitiate(request: UserLinkInitiateRequest): Promise<UserLinkInitiateResponse> {
    if (!request.email) {
      throw new Error('Email is required for account link initiation');
    }
    const response = await this.httpClient.post<UserLinkInitiateResponse>(
      '/v1/users/link/initiate',
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
   * Get user purchases
   * @param request - User purchases request parameters
   * @returns Promise with user purchases response
   */
  async getUserPurchases(request: GetUserPurchasesRequest): Promise<GetUserPurchasesResponse> {
    if (!request.userRef) {
      throw new Error('User reference is required');
    }
    const response = await this.httpClient.get<GetUserPurchasesResponse>(
      `/v1/users/${request.userRef}/purchases`,
      { params: { limit: request.limit } }
    );
    return response.data;
  }

  /**
   * Get user information
   * @param request - User info request parameters
   * @returns Promise with user info response
   */
  async getUserInfo(request: GetUserInfoRequest): Promise<GetUserInfoResponse> {
    if (!request.userRef) {
      throw new Error('User reference is required');
    }
    const response = await this.httpClient.get<GetUserInfoResponse>(
      `/v1/users/${request.userRef}`
    );
    return response.data;
  }

}
