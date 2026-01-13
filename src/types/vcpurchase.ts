/**
 * Virtual Currency Purchase API Types
 */

/**
 * Request parameters for initiating a VC purchase
 */
export interface InitiateVCPurchaseRequest {
  /** User ID */
  userId: string;
  /** Item ID */
  itemId: string;
  /** Currency ID */
  currencyId: string;
  /** Optional affiliate code */
  affiliateCode?: string;
  /** Optional deal code */
  dealCode?: string;
  /** Optional metadata */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Response for initiating a VC purchase
 */
export interface InitiateVCPurchaseResponse {
  /** Data object */
  data: {
    /** Purchase ID */
    purchaseId: string;
    /** Currency ID */
    currencyId: string;
    /** Amount in base units */
    amountUnits: string;
  };
}

/**
 * Request parameters for completing a VC purchase
 */
export interface CompleteVCPurchaseRequest {
  /** Purchase ID */
  purchaseId: string;
}

/**
 * Purchase details
 */
export interface VCPurchaseDetails {
  /** Purchase ID */
  _id: string;
  /** Purchase status */
  status: string;
  /** Payment status */
  isPaid: boolean;
  /** Fulfillment status */
  fulfillmentStatus: string;
}

/**
 * Response for completing a VC purchase
 */
export interface CompleteVCPurchaseResponse {
  /** Data object */
  data: {
    /** Purchase ID */
    purchaseId: string;
    /** Journal/transaction ID */
    journalId: string;
    /** New balance in base units */
    newBalanceUnits: string;
    /** Purchase details */
    purchase: VCPurchaseDetails;
  };
}
