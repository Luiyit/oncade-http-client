export interface GetBalanceRequest {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
}

export interface GetBalanceResponse {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
  /** Balance amount */
  balance: string;
  /** Wallet address */
  address?: string;
}

