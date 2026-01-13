import { HttpClient } from '../http/client';
import {
  GetBalanceRequest,
  GetBalanceResponse,
} from '../types';

export class BalanceAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get or create a player balance for the specified currency
   * @param request - Balance request parameters
   * @returns Promise with balance response
   */
  async getBalance(request: GetBalanceRequest): Promise<GetBalanceResponse> {
    if (!request.currencyId || !request.userRef) {
      throw new Error('Currency ID and user reference are required');
    }
    const response = await this.httpClient.get<GetBalanceResponse>(
      '/v1/balances',
      { params: request }
    );
    return response.data;
  }
}

