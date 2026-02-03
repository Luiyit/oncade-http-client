/**
 * Subscription API Types (v4)
 */

export interface GetUserSubscriptionsRequest {
  userRef: string;
  limit?: number;
  offset?: number;
}

export interface SubscriptionSummary {
  itemId: string;
  status: string;
  subscriptionId: string;
  planCode: string;
  planId: string;
}

export interface GetUserSubscriptionsResponse {
  subscriptions: SubscriptionSummary[];
}

export interface GetSubscriptionByItemRequest {
  userRef: string;
  itemId: string;
}

export interface GetSubscriptionByItemResponse {
  itemId: string;
  status: string;
  subscriptionId: string;
  planCode: string;
  planId: string;
}

export interface CreateSubscriptionRequest {
  userRef: string;
  itemId: string;
}

export interface CreateSubscriptionResponse {
  subscription: SubscriptionSummary;
  message?: string;
}

export interface CancelSubscriptionRequest {
  userRef: string;
  itemId: string;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  subscriptionId: string;
}
