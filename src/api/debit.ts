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
    if (!request.currencyId || !request.userRef || !request.amountUnits) {
      throw new Error('Currency ID, user reference, and amountUnits are required');
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
    if (!request.currencyId || !request.sourceUserRef || !request.recipients || request.recipients.length === 0) {
      throw new Error('Currency ID, source user reference, and at least one recipient are required');
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

