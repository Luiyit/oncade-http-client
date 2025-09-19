export interface UserLinkInitiateRequest {
  /** Email address of the user to link */
  email: string;
  /** Optional session key */
  sessionKey?: string;
}

export interface UserLinkInitiateResponse {
  /** Success status */
  success: boolean;
  /** Session key for tracking */
  sessionKey: string;
  /** Redirect URL if applicable */
  url?: string;
}

export interface UserLinkCompleteRequest {
  /** Session key from the initiate response */
  sessionKey: string;
  /** Additional completion data */
  data?: Record<string, any>;
}

export interface UserLinkCompleteResponse {
  /** Success status */
  success: boolean;
  /** User information after linking */
  user: {
    id: string;
    email: string;
    gameId: string;
    linkedAt: string;
  };
  /** Access token for the linked user */
  accessToken?: string;
}

export interface GetUserPurchasesRequest {
  /** User reference */
  userRef: string;
  /** Optional limit for purchases */
  limit?: number;
}

export interface GetUserPurchasesResponse {
  /** List of user purchases */
  purchases: Array<{
    id: string;
    productId: string;
    amount: number;
    paymentMethod: string;
    status: string;
    createdAt: string;
  }>;
}

export interface GetUserInfoRequest {
  /** User reference */
  userRef: string;
}

export interface GetUserInfoResponse {
  /** User information */
  user: {
    id: string;
    email: string;
    gameId: string;
    linkedAt: string;
    status: string;
  };
}
