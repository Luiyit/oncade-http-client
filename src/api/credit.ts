import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  CreateCreditRequest,
  CreateCreditResponse,
} from '../types';

export class CreditAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Create a credit transaction
   * @param request - Credit creation parameters
   * @returns Promise with credit response
   */
  async createCredit(request: CreateCreditRequest): Promise<CreateCreditResponse> {
    if (!request.currencyId || !request.userRef || !request.amount) {
      throw new Error('Currency ID, user reference, and amount are required');
    }
    const response = await this.httpClient.post<CreateCreditResponse>(
      '/v1/credits',
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

