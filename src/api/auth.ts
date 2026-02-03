import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  InitiateAccountLinkRequest,
  InitiateAccountLinkResponse,
  GetLinkStatusRequest,
  GetLinkStatusResponse,
  ApproveLinkRequest,
  ApproveLinkResponse,
  DeclineLinkRequest,
  DeclineLinkResponse,
  RemoveLinkRequest,
  RemoveLinkResponse,
} from '../types';

export class AuthAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Initiate account link for a user
   * @param request - Account link initiation parameters
   * @returns Promise with initiation response
   */
  async initiateAccountLink(request: InitiateAccountLinkRequest): Promise<InitiateAccountLinkResponse> {
    if (!request.email) {
      throw new Error('Email is required for account link initiation');
    }
    const response = await this.httpClient.post<InitiateAccountLinkResponse>(
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
   * Get account link status
   * @param request - Link status request parameters
   * @returns Promise with link status response
   */
  async getLinkStatus(request: GetLinkStatusRequest): Promise<GetLinkStatusResponse> {
    if (!request.session) {
      throw new Error('Session key is required');
    }
    const response = await this.httpClient.get<GetLinkStatusResponse>(
      '/v1/users/link/details',
      { params: request }
    );
    return response.data;
  }

  /**
   * Approve account link
   * @param request - Approve link request parameters
   * @returns Promise with approval response
   */
  async approveLink(request: ApproveLinkRequest): Promise<ApproveLinkResponse> {
    if (!request.sessionKey) {
      throw new Error('Session key is required');
    }
    const response = await this.httpClient.post<ApproveLinkResponse>(
      '/v1/users/link/approve',
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
   * Decline account link
   * @param request - Decline link request parameters
   * @returns Promise with decline response
   */
  async declineLink(request: DeclineLinkRequest): Promise<DeclineLinkResponse> {
    if (!request.sessionKey) {
      throw new Error('Session key is required');
    }
    const response = await this.httpClient.post<DeclineLinkResponse>(
      '/v1/users/link/decline',
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
   * Remove account link
   * @param request - Remove link request parameters
   * @returns Promise with remove response
   */
  async removeLink(request: RemoveLinkRequest): Promise<RemoveLinkResponse> {
    if (!request.userRef) {
      throw new Error('User reference is required');
    }
    const response = await this.httpClient.post<RemoveLinkResponse>(
      '/v1/users/link/remove',
      { user_ref: request.userRef },
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

}
