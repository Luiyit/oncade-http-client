export interface UserLinkInitiateRequest {
  email: string;
  sessionKey?: string;
}

export interface UserLinkInitiateResponse {
  url: string;
  sessionKey: string;
}

export interface GetUserPurchasesRequest {
  userRef: string;
  limit?: number;
  offset?: number;
  type?: string;
}

export interface GetUserPurchaseItem {
  itemId: string;
  gameId: string;
  createdAt: string;
  item: {
    name: string;
    type: string;
    price: number;
  };
}

export type GetUserPurchasesResponse = GetUserPurchaseItem[];

export interface GetUserInfoRequest {
  userRef: string;
}

export interface GetUserInfoResponse {
  userRef: string;
  email: string;
  profileImageUrl?: string;
  subscriptions: Array<{
    itemId: string;
    status: string;
    subscriptionId: string;
    planCode: string;
    planId: string;
  }>;
}
