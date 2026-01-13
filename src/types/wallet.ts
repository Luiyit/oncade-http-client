export interface GetUserBalanceRequest {
  /** User ID */
  userId: string;
}

export interface GetUserBalanceResponse {
  /** Wallet address */
  address: string;
  /** User balance */
  balance: string;
}

export interface GetWithdrawLinkRequest {
  /** User ID */
  userId: string;
}

export interface GetWithdrawLinkResponse {
  /** Withdraw URL */
  url: string;
}

export interface InitiateWalletPurchaseRequest {
  /** User ID */
  userId: string;
  /** Item ID */
  itemId: string;
  /** Optional affiliate code */
  affiliateCode?: string;
}

export interface InitiateWalletPurchaseResponse {
  /** Purchase data */
  data: {
    purchaseId: string;
    distributions: Array<{
      recipient: string;
      recipientAddress: string;
      amount: number;
    }>;
  };
}

export interface GetWalletPurchaseRequest {
  /** Purchase ID */
  purchaseId: string;
}

export interface GetWalletPurchaseResponse {
  /** Purchase data */
  data: {
    _id: string;
    itemId: string;
    userId: string;
    gameId: string;
    environment: string;
    status: string;
    fulfillmentStatus: string;
    priceInCents: number;
    taxAmountInCents: number;
    feeRate: {
      percentage: number;
      flat: number;
    };
    feeName: string;
    payouts: Array<{
      recipient: string;
      recipientAddress: string;
      amount: number;
    }>;
    createdAt: string;
    updatedAt: string;
  };
}