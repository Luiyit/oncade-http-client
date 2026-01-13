/**
 * Subscription API Types
 */

/**
 * Subscription item details
 */
export interface Subscription {
  /** Subscription ID */
  subscriptionId: string;
  /** Item ID */
  itemId: string;
  /** User reference */
  userRef: string;
  /** Subscription status */
  status: string;
  /** Current period start */
  currentPeriodStart: string;
  /** Current period end */
  currentPeriodEnd: string;
  /** Cancel at period end flag */
  cancelAtPeriodEnd: boolean;
  /** Cancelled at timestamp */
  cancelledAt?: string;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}

/**
 * Request parameters for getting user subscriptions
 */
export interface GetUserSubscriptionsRequest {
  /** User reference */
  userRef: string;
  /** Optional limit */
  limit?: number;
  /** Optional offset */
  offset?: number;
}

/**
 * Response for getting user subscriptions
 */
export interface GetUserSubscriptionsResponse {
  /** Array of subscriptions */
  subscriptions: Subscription[];
  /** Total count */
  total: number;
  /** Limit used */
  limit: number;
  /** Offset used */
  offset: number;
}

/**
 * Request parameters for creating a subscription
 */
export interface CreateSubscriptionRequest {
  /** User reference */
  userRef: string;
  /** Item ID */
  itemId: string;
}

/**
 * Response for creating a subscription
 */
export interface CreateSubscriptionResponse {
  /** Created subscription */
  subscription: Subscription;
  /** Success message */
  message: string;
}

/**
 * Request parameters for cancelling a subscription
 */
export interface CancelSubscriptionRequest {
  /** User reference */
  userRef: string;
  /** Item ID */
  itemId: string;
}

/**
 * Response for cancelling a subscription
 */
export interface CancelSubscriptionResponse {
  /** Updated subscription */
  subscription: Subscription;
  /** Success message */
  message: string;
}
