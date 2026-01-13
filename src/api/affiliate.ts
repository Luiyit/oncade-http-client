import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  CreateAffiliateLinkRequest,
  CreateAffiliateLinkResponse,
} from '../types';

export class AffiliateAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Create an affiliate link
   * @param request - Affiliate link creation parameters
   * @returns Promise with affiliate link response
   */
  async createAffiliateLink(request: CreateAffiliateLinkRequest): Promise<CreateAffiliateLinkResponse> {
    if (!request.userId) {
      throw new Error('User ID is required');
    }
    const response = await this.httpClient.post<CreateAffiliateLinkResponse>(
      '/v1/affiliate-links',
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

