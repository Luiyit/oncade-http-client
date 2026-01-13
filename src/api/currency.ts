import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  CreateCurrencyRequest,
  CreateCurrencyResponse,
  ListCurrenciesRequest,
  ListCurrenciesResponse,
  UpdateCurrencyRequest,
  UpdateCurrencyResponse,
} from '../types';

export class CurrencyAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Create a virtual currency
   * @param request - Currency creation parameters
   * @returns Promise with created currency response
   */
  async createCurrency(request: CreateCurrencyRequest): Promise<CreateCurrencyResponse> {
    if (!request.code || !request.name || !request.baseUnitsPerVcUnit || !request.centralWalletAddress) {
      throw new Error('All required fields must be provided for currency creation');
    }
    const response = await this.httpClient.post<CreateCurrencyResponse>(
      '/v1/vc/currencies',
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
   * List virtual currencies
   * @param request - List currencies request parameters
   * @returns Promise with currencies response
   */
  async listCurrencies(request?: ListCurrenciesRequest): Promise<ListCurrenciesResponse> {
    const response = await this.httpClient.get<ListCurrenciesResponse>(
      '/v1/vc/currencies',
      { params: request }
    );
    return response.data;
  }

  /**
   * Update virtual currency
   * @param request - Update currency parameters
   * @returns Promise with updated currency response
   */
  async updateCurrency(request: UpdateCurrencyRequest): Promise<UpdateCurrencyResponse> {
    if (!request.currencyId) {
      throw new Error('Currency ID is required');
    }
    const { currencyId, ...updateData } = request;
    const response = await this.httpClient.patch<UpdateCurrencyResponse>(
      `/v1/vc/currencies/${currencyId}`,
      updateData,
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }
}

