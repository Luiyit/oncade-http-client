export interface CreateCashoutRequest {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
  /** Units to cash out */
  units: string;
}

export interface CreateCashoutResponse {
  /** Cashout request ID */
  cashoutRequestId: string;
}

export interface ListCashoutsRequest {
  /** Currency ID */
  currencyId?: string;
  /** Status filter (e.g. pendingReview) */
  status?: string;
  /** User reference */
  userRef?: string;
  /** Page number */
  page?: number;
  /** Items per page */
  limit?: number;
}

export interface CashoutListItem {
  _id: string;
  userRef: string;
  unitsRequested: string;
  status: string;
  requestedRate: {
    baseUnitsPerVcUnit: string;
    capturedAt: string;
  };
}

export interface ListCashoutsResponse {
  /** List of cashout requests */
  items: CashoutListItem[];
  /** Pagination information */
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApproveCashoutRequest {
  /** Cashout request ID */
  cashoutRequestId: string;
}

export interface ApproveCashoutResponse {
  /** Conversion transaction ID */
  transactionId: string;
  /** Base units per VC unit used */
  usedBaseUnitsPerVcUnit: string;
  /** Converted base units amount */
  convertedBaseUnits: string;
}

export interface RejectCashoutRequest {
  /** Cashout request ID */
  cashoutRequestId: string;
  /** Optional reason */
  reason?: string;
}

/** Reject returns 204 No Content; no response body */
export type RejectCashoutResponse = void;

