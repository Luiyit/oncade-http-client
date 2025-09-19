import { HttpClient } from './http/client';
import { AuthAPI } from './api/auth';
import { StoreAPI } from './api/store';
import { UserAPI } from './api/user';
import { WalletAPI } from './api/wallet';
import { OncadeConfig } from './types';

export class OncadeClient {
  private httpClient: HttpClient;
  public readonly auth: AuthAPI;
  public readonly store: StoreAPI;
  public readonly user: UserAPI;
  public readonly wallet: WalletAPI;

  constructor(config: OncadeConfig) {
    this.httpClient = new HttpClient(config);
    this.auth = new AuthAPI(this.httpClient);
    this.store = new StoreAPI(this.httpClient);
    this.user = new UserAPI(this.httpClient);
    this.wallet = new WalletAPI(this.httpClient);
  }

  /**
   * Update client configuration
   * @param newConfig - New configuration options
   */
  updateConfig(newConfig: Partial<OncadeConfig>): void {
    this.httpClient.updateConfig(newConfig);
  }

  /**
   * Get current client configuration
   * @returns Current configuration
   */
  getConfig(): OncadeConfig {
    return this.httpClient.getConfig();
  }

  /**
   * Set authentication token
   * @param token - Bearer token for authentication
   */
  setToken(token: string): void {
    this.updateConfig({ bearerToken: token });
  }

  /**
   * Set API key
   * @param apiKey - API key for authentication
   */
  setApiKey(apiKey: string): void {
    this.updateConfig({ apiKey });
  }

  /**
   * Set game ID
   * @param gameId - Game ID for API requests
   */
  setGameId(gameId: string): void {
    this.updateConfig({ gameId });
  }

  /**
   * Set base URL
   * @param baseURL - Base URL for API requests
   */
  setBaseURL(baseURL: string): void {
    this.updateConfig({ baseURL });
  }

  /**
   * Set request timeout
   * @param timeout - Timeout in milliseconds
   */
  setTimeout(timeout: number): void {
    this.updateConfig({ timeout });
  }

  /**
   * Set custom headers
   * @param headers - Custom headers to include in requests
   */
  setHeaders(headers: Record<string, string>): void {
    const currentConfig = this.getConfig();
    this.updateConfig({
      headers: {
        ...currentConfig.headers,
        ...headers,
      },
    });
  }
}
