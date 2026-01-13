import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  CreateDebitRequest,
  CreateDebitResponse,
} from '../types';

export class DebitAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Create a debit transaction
   * @param request - Debit creation parameters
   * @returns Promise with debit response
   */
  async createDebit(request: CreateDebitRequest): Promise<CreateDebitResponse> {
    if (!request.currencyId || !request.userRef || !request.amount) {
      throw new Error('Currency ID, user reference, and amount are required');
    }
    const response = await this.httpClient.post<CreateDebitResponse>(
      '/v1/debits',
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

