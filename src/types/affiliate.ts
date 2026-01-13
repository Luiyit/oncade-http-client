export interface CreateAffiliateLinkRequest {
  /** User ID */
  userId: string;
  /** Optional item ID */
  itemId?: string;
}

export interface CreateAffiliateLinkResponse {
  /** Short affiliate code */
  shortCode: string;
}

