import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OncadeConfig, RequestConfig, ApiResponse } from '../types';

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private config: OncadeConfig;

  constructor(config: OncadeConfig) {
    this.config = {
      baseURL: 'https://oncade.gg/api',
      //timeout: 30000,
      //secure: true,
      version: 'v1',
      ...config,
    };

    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      //timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        //'User-Agent': 'oncade-client/1.0.0',
        ...this.config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add authentication headers        
        if (this.config.apiKey) {
          config.headers['Authorization'] = `Bearer ${this.config.apiKey}`;
        }

        // Add game ID header
        if (this.config.gameId) {
          config.headers['X-Game-Id'] = this.config.gameId;
        }

        // Add campaign ID header
        if (this.config.campaignId) {
          config.headers['X-Campaign-Id'] = this.config.campaignId;
        }

        // Add API version
        if (this.config.version) {
          config.headers['X-Oncade-API-Version'] = this.config.version;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle common error cases
        if (error.response) {
          // Server responded with error status
          const errorMessage = error.response.data?.message || error.response.data?.error || error.response.statusText;
          throw new Error(`API Error (${error.response.status}): ${errorMessage}`);
        } else if (error.request) {
          // Request was made but no response received
          throw new Error('Network Error: No response received from server');
        } else {
          // Something else happened
          throw new Error(`Request Error: ${error.message}`);
        }
      }
    );
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...this.config.headers,
        ...config?.headers,
      },
    };

    const response = await this.axiosInstance.get(url, axiosConfig);
    return response;
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...this.config.headers,
        ...config?.headers,
      },
    };

    const response = await this.axiosInstance.post(url, data, axiosConfig);
    return response;
  }

  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...this.config.headers,
        ...config?.headers,
      },
    };

    const response = await this.axiosInstance.put(url, data, axiosConfig);
    return response;
  }

  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...this.config.headers,
        ...config?.headers,
      },
    };

    const response = await this.axiosInstance.patch(url, data, axiosConfig);
    return response;
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...this.config.headers,
        ...config?.headers,
      },
    };

    const response = await this.axiosInstance.delete(url, axiosConfig);
    return response;
  }

  updateConfig(newConfig: Partial<OncadeConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update axios instance configuration
    if (newConfig.baseURL) {
      this.axiosInstance.defaults.baseURL = newConfig.baseURL;
    }
    
    if (newConfig.timeout) {
      this.axiosInstance.defaults.timeout = newConfig.timeout;
    }
    
    if (newConfig.headers) {
      this.axiosInstance.defaults.headers = {
        ...this.axiosInstance.defaults.headers,
        ...newConfig.headers,
      };
    }
  }

  getConfig(): OncadeConfig {
    return { ...this.config };
  }
}
