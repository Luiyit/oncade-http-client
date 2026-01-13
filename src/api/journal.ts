import { HttpClient } from '../http/client';
import {
  ListJournalsRequest,
  ListJournalsResponse,
} from '../types';

export class JournalAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * List journal entries
   * @param request - List journals request parameters
   * @returns Promise with journals response
   */
  async listJournals(request?: ListJournalsRequest): Promise<ListJournalsResponse> {
    const response = await this.httpClient.get<ListJournalsResponse>(
      '/v1/vc/journals',
      { params: request }
    );
    return response.data;
  }
}

