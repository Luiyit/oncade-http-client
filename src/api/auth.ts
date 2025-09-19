import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  InitiateAccountLinkRequest,
  InitiateAccountLinkResponse,
  GetLinkStatusRequest,
  GetLinkStatusResponse,
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

}
