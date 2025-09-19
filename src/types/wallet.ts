export interface GetUserBalanceRequest {
  /** User ID */
  userId: string;
}

export interface GetUserBalanceResponse {
  /** User balance */
  balance: number;
  /** Currency */
  currency: string;
}

export interface GetWithdrawLinkRequest {
  /** User ID */
  userId: string;
}

export interface GetWithdrawLinkResponse {
  /** Withdraw link */
  link: string;
}