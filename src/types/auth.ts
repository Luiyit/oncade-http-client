export interface InitiateAccountLinkRequest {
  /** Email address of the user to link */
  email: string;
  /** Optional session key */
  sessionKey?: string;
}

export interface InitiateAccountLinkResponse {
  /** Success status */
  success: boolean;
  /** Session key for tracking */
  sessionKey: string;
  /** Redirect URL if applicable */
  url?: string;
}

export interface GetLinkStatusRequest {
  /** Session key to check status */
  session: string;
}

export interface GetLinkStatusResponse {
  /** Link status */
  status: string;
  /** User information if linked */
  user?: {
    id: string;
    email: string;
    gameId: string;
    linkedAt: string;
  };
}

export interface ApproveLinkRequest {
  /** Session key from the initiate response */
  sessionKey: string;
}

export interface ApproveLinkResponse {
  /** Success status */
  success: boolean;
  /** User information after approval */
  user?: {
    id: string;
    email: string;
    gameId: string;
    linkedAt: string;
  };
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