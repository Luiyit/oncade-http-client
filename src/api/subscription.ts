import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  GetUserSubscriptionsRequest,
  GetUserSubscriptionsResponse,
  GetSubscriptionByItemRequest,
  GetSubscriptionByItemResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CancelSubscriptionRequest,
  CancelSubscriptionResponse,
} from '../types';

export class SubscriptionAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get user subscriptions
   * @param request - User subscriptions request parameters
   * @returns Promise with user subscriptions response
   */
  async getUserSubscriptions(request: GetUserSubscriptionsRequest): Promise<GetUserSubscriptionsResponse> {
    if (!request.userRef) {
      throw new Error('User reference is required');
    }
    const { userRef, ...params } = request;
    const response = await this.httpClient.get<GetUserSubscriptionsResponse>(
      `/v1/users/${userRef}/subscriptions`,
      { params }
    );
    return response.data;
  }

  /**
   * Get subscription by item ID
   * @param request - Get subscription by item request parameters
   * @returns Promise with subscription details
   */
  async getSubscriptionByItem(request: GetSubscriptionByItemRequest): Promise<GetSubscriptionByItemResponse> {
    if (!request.userRef || !request.itemId) {
      throw new Error('User reference and item ID are required');
    }
    const response = await this.httpClient.get<GetSubscriptionByItemResponse>(
      `/v1/users/${request.userRef}/subscriptions/${request.itemId}`
    );
    return response.data;
  }

  /**
   * Create a subscription
   * @param request - Create subscription request parameters
   * @returns Promise with created subscription response
   */
  async createSubscription(request: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> {
    if (!request.userRef || !request.itemId) {
      throw new Error('User reference and item ID are required');
    }
    const { userRef, itemId } = request;
    console.log(`Creating subscription for user`);
    console.log(`/v1/users/${userRef}/subscriptions/${itemId}`);
    
    const response = await this.httpClient.post<CreateSubscriptionResponse>(
      `/v1/users/${userRef}/subscriptions/${itemId}`,
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
   * Cancel a subscription
   * @param request - Cancel subscription request parameters
   * @returns Promise with cancelled subscription response
   */
  async cancelSubscription(request: CancelSubscriptionRequest): Promise<CancelSubscriptionResponse> {
    if (!request.userRef || !request.itemId) {
      throw new Error('User reference and item ID are required');
    }
    const { userRef, itemId } = request;
    const response = await this.httpClient.post<CancelSubscriptionResponse>(
      `/v1/users/${userRef}/subscriptions/${itemId}/cancel`,
      {},
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }
}
