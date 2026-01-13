import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  CreateDebitRequest,
  CreateDebitResponse,
  BatchDebitRequest,
  BatchDebitResponse,
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
      '/v1/vc/debits',
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
   * Create batch debit transactions
   * @param request - Batch debit creation parameters
   * @returns Promise with batch debit response
   */
  async batchDebit(request: BatchDebitRequest): Promise<BatchDebitResponse> {
    if (!request.currencyId || !request.debits || request.debits.length === 0) {
      throw new Error('Currency ID and at least one debit are required');
    }
    const response = await this.httpClient.post<BatchDebitResponse>(
      '/v1/vc/batch-debits',
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

