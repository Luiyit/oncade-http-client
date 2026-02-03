export interface InitiateAccountLinkRequest {
  /** Email address of the user to link */
  email: string;
  /** Optional session key */
  sessionKey?: string;
}

export interface InitiateAccountLinkResponse {
  /** URL for the user to complete linking */
  url: string;
  /** Session key for tracking */
  sessionKey: string;
}

export interface GetLinkStatusRequest {
  /** Session key to check status */
  session: string;
}

/** Spend permission when linking with token allowance */
export interface SpendPermission {
  tenantId: string;
  tenantName: string;
  tokenAddress: string;
  allowanceUSDC: string;
  periodSeconds: number;
  durationSeconds: number;
  tenantModuleAddress: string;
  networkKey: string;
}

export interface GetLinkStatusResponse {
  /** Namespace type: 'game' or 'campaign' */
  namespaceType: string;
  /** Game ID (when namespace is game) */
  gameId?: string;
  /** Game name (when namespace is game) */
  gameName?: string;
  /** Prefilled email from the link session */
  prefilledEmail: string;
  /** User reference once the session is approved */
  userRef?: string;
  /** Spend permission request when set */
  spendPermission?: SpendPermission;
}

export interface ApproveLinkRequest {
  /** Session key from the initiate response */
  sessionKey: string;
}

export interface ApproveLinkResponse {
  /** Success status */
  success: boolean;
}

export interface DeclineLinkRequest {
  /** Session key from the initiate response */
  sessionKey: string;
}

export interface DeclineLinkResponse {
  /** Success status */
  success: boolean;
}

export interface RemoveLinkRequest {
  /** User reference */
  userRef: string;
}

export interface RemoveLinkResponse {
  /** Success status */
  success: boolean;
}