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
