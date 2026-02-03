/**
 * Checkout method types
 */
export type CheckoutMethod = 'credit' | 'stripe' | 'paypal';

/**
 * Request parameters for getting checkout theme
 */
export interface GetCheckoutThemeRequest {
  /** Game ID */
  gameId: string;
  /** Optional item ID */
  itemId?: string;
}

/**
 * Response containing checkout theme
 */
export interface GetCheckoutThemeResponse {
  /** Primary button color */
  primaryButtonColor: string;
  /** Secondary button color */
  secondaryButtonColor: string;
  /** Notify button color */
  notifyButtonColor: string;
  /** Background color */
  backgroundColor: string;
  /** Border color */
  borderColor: string;
  /** Price override color */
  priceOverrideColor: string;
  /** Logo URL */
  logoUrl?: string;
}

export interface GetCheckoutRedirectRequest {
  /** Game ID */
  gameId: string;
  /** Item ID */
  itemId: string;
  /** Optional redirect URL */
  redirectUrl?: string;
  /** Optional affiliate code */
  affiliateCode?: string;
  /** Optional deal code */
  dealCode?: string;
  /** Optional checkout method */
  checkoutMethod?: CheckoutMethod;
}

export interface GetCheckoutRedirectResponse {
  /** Redirect URL */
  url: string;
}

