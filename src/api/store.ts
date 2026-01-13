import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  ListProductsRequest,
  ListProductsResponse,
  CreateProductRequest,
  CreateProductResponse,
  CreateUGCProductRequest,
  CreateUGCProductResponse,
  SubmitProductForReviewRequest,
  SubmitProductForReviewResponse,
  ReviewProductRequest,
  ReviewProductResponse,
  ListCreatorProductsRequest,
  ListCreatorProductsResponse,
  InitiatePurchaseRequest,
  InitiatePurchaseResponse,
  GetPurchaseDetailsRequest,
  GetPurchaseDetailsResponse,
  UpdateProductSaleStateRequest,
  UpdateProductSaleStateResponse,
  GetProductRequest,
  GetProductResponse,
} from '../types';

export class StoreAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * List products
   * @param request - List products request parameters
   * @returns Promise with products response
   */
  async listProducts(request?: ListProductsRequest): Promise<ListProductsResponse> {
    const response = await this.httpClient.get<ListProductsResponse>(
      '/v1/products',
      { params: request }
    );
    return response.data;
  }

  /**
   * Get product by ID
   * @param request - Get product request parameters
   * @returns Promise with product response
   */
  async getProduct(request: GetProductRequest): Promise<GetProductResponse> {
    if (!request.productId) {
      throw new Error('Product ID is required');
    }
    const response = await this.httpClient.get<GetProductResponse>(
      `/v1/products/${request.productId}`
    );
    return response.data;
  }

  /**
   * Create a product
   * @param request - Product creation parameters
   * @returns Promise with created product response
   */
  async createProduct(request: CreateProductRequest): Promise<CreateProductResponse> {
    if (!request.name || !request.type || !request.fulfillmentType || !request.description || request.price == null || !request.category) {
      throw new Error('All required fields must be provided for product creation');
    }
    const response = await this.httpClient.post<CreateProductResponse>(
      '/v1/products',
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
   * Create a UGC product
   * @param userRef - User reference
   * @param request - UGC product creation parameters
   * @returns Promise with created UGC product response
   */
  async createUGCProduct(userRef: string, request: CreateUGCProductRequest): Promise<CreateUGCProductResponse> {
    if (!userRef) {
      throw new Error('User reference is required');
    }

    if (
      !request.name || 
      !request.type || 
      !request.fulfillmentType || 
      request.price == null || 
      typeof request.description !== 'string' || 
      typeof request.content !== 'string'
    ){
      throw new Error('All required fields must be provided for UGC product creation');
    }
    
    if(request.price < 100){
      throw new Error('Price must be at least (1.00 USD)');
    }
    
    const response = await this.httpClient.post<CreateUGCProductResponse>(
      `/v1/products/${userRef}`,
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
   * Submit product for review
   * @param request - Submit for review parameters
   * @returns Promise with submission response
   */
  async submitProductForReview(request: SubmitProductForReviewRequest): Promise<SubmitProductForReviewResponse> {
    if (!request.userRef || !request.productId) {
      throw new Error('User reference and product ID are required');
    }
    const response = await this.httpClient.post<SubmitProductForReviewResponse>(
      `/v1/products/${request.userRef}/${request.productId}/submit`,
      {},
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * Review product
   * @param request - Review parameters
   * @returns Promise with review response
   */
  async reviewProduct(request: ReviewProductRequest): Promise<ReviewProductResponse> {
    if (!request.userRef || !request.productId || !request.decision) {
      throw new Error('User reference, product ID, and decision are required');
    }
    const response = await this.httpClient.post<ReviewProductResponse>(
      `/v1/products/${request.userRef}/${request.productId}/review`,
      { decision: request.decision },
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * List creator products
   * @param request - List creator products parameters
   * @returns Promise with creator products response
   */
  async listCreatorProducts(request: ListCreatorProductsRequest): Promise<ListCreatorProductsResponse> {
    if (!request.userRef) {
      throw new Error('User reference is required');
    }
    const response = await this.httpClient.get<ListCreatorProductsResponse>(
      `/v1/products/${request.userRef}`
    );
    return response.data;
  }

  /**
   * Initiate purchase
   * @param request - Purchase initiation parameters
   * @returns Promise with purchase response
   */
  async initiatePurchase(request: InitiatePurchaseRequest): Promise<InitiatePurchaseResponse> {
    if (!request.userRef || !request.productId || request.amount == null || !request.paymentMethod) {
      throw new Error('All required fields must be provided for purchase initiation');
    }
    const response = await this.httpClient.post<InitiatePurchaseResponse>(
      '/v1/purchases',
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
   * Get purchase details
   * @param request - Purchase details parameters
   * @returns Promise with purchase details response
   */
  async getPurchaseDetails(request: GetPurchaseDetailsRequest): Promise<GetPurchaseDetailsResponse> {
    if (!request.purchaseId) {
      throw new Error('Purchase ID is required');
    }
    const response = await this.httpClient.get<GetPurchaseDetailsResponse>(
      `/v1/purchases/${request.purchaseId}`
    );
    return response.data;
  }

  /**
   * Update product sale state
   * @param request - Update product sale state parameters
   * @returns Promise with updated product response
   */
  async updateProductSaleState(request: UpdateProductSaleStateRequest): Promise<UpdateProductSaleStateResponse> {
    if (!request.productId || request.forSale == null) {
      throw new Error('Product ID and forSale state are required');
    }
    const response = await this.httpClient.put<UpdateProductSaleStateResponse>(
      '/v1/products',
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
