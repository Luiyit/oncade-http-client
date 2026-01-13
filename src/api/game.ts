import { HttpClient } from '../http/client';
import {
  GetGameResponse,
} from '../types';

export class GameAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get game information
   * @returns Promise with game information response
   */
  async getGame(): Promise<GetGameResponse> {
    const response = await this.httpClient.get<GetGameResponse>(
      '/v1/game'
    );
    return response.data;
  }
}
