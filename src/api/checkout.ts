import { HttpClient } from '../http/client';
import {
  GetCheckoutRedirectRequest,
  GetCheckoutRedirectResponse,
  GetCheckoutThemeRequest,
  GetCheckoutThemeResponse,
} from '../types';

export class CheckoutAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get checkout theme
   * @param request - Checkout theme request parameters
   * @returns Promise with theme response
   */
  async getCheckoutTheme(request: GetCheckoutThemeRequest): Promise<GetCheckoutThemeResponse> {
    if (!request.gameId) {
      throw new Error('Game ID is required');
    }
    const response = await this.httpClient.get<GetCheckoutThemeResponse>(
      '/v1/checkout/theme',
      { params: request }
    );
    return response.data;
  }

  /**
   * Get checkout redirect URL
   * @param request - Checkout redirect request parameters
   * @returns Promise with redirect response
   */
  async getCheckoutRedirect(request: GetCheckoutRedirectRequest): Promise<GetCheckoutRedirectResponse> {
    if (!request.gameId || !request.itemId) {
      throw new Error('Game ID and item ID are required');
    }

    const response = await this.httpClient.get<GetCheckoutRedirectResponse>(
      '/v1/checkout/redirect',
      { params: request }
    );
    return response.data;
  }
}

