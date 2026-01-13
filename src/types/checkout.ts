export interface GetCheckoutRedirectRequest {
  /** Game ID */
  gameId: string;
  /** Item ID */
  itemId: string;
  /** Optional redirect URL */
  redirectUrl?: string;
  /** Optional affiliate code */
  affiliateCode?: string;
}

export interface GetCheckoutRedirectResponse {
  /** HTTP status */
  status: number;
  /** Response headers */
  headers: {
    Location: string;
  };
}

