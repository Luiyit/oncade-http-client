import { HttpClient } from '../http/client';
import {
  GetCheckoutRedirectRequest,
  GetCheckoutRedirectResponse,
} from '../types';

export class CheckoutAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get checkout redirect URL
   * @param request - Checkout redirect request parameters
   * @returns Promise with redirect response
   */
  async getCheckoutRedirect(request: GetCheckoutRedirectRequest): Promise<GetCheckoutRedirectResponse> {
    if (!request.gameId || !request.itemId) {
      throw new Error('Game ID and item ID are required');
    }
    
    console.log('CheckoutAPI constructor', this.httpClient);

    const response = await this.httpClient.get<GetCheckoutRedirectResponse>(
      '/v1/checkout/redirect',
      { params: request }
    );
    return response.data;
  }
}

