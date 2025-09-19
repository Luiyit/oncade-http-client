export interface OncadeConfig {
  /** Base URL of the Oncade API */
  baseURL?: string;
  /** API key for authentication */
  apiKey?: string;
  /** Bearer token for authentication */
  bearerToken?: string;
  /** Game ID for API requests */
  gameId?: string;
  /** Timeout for requests in milliseconds */
  timeout?: number;
  /** Additional headers to include in requests */
  headers?: Record<string, string>;
  /** Whether to use HTTPS (default: true) */
  secure?: boolean;
  /** API version to use */
  version?: string;
}

export interface RequestConfig {
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Additional headers for this request */
  headers?: Record<string, string>;
  /** Request parameters */
  params?: Record<string, any>;
  /** Request body data */
  data?: any;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, any>;
  config: any;
}
