export interface CreateCashoutRequest {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
  /** Amount to cash out */
  amount: string;
  /** Destination address */
  destinationAddress: string;
}

export interface CreateCashoutResponse {
  /** Cashout transaction */
  cashout: {
    _id: string;
    currencyId: string;
    userRef: string;
    amount: string;
    destinationAddress: string;
    status: string;
    createdAt: string;
  };
}

export interface ListCashoutsRequest {
  /** Currency ID */
  currencyId?: string;
  /** User reference */
  userRef?: string;
  /** Page number */
  page?: number;
  /** Items per page */
  limit?: number;
}

export interface Cashout {
  _id: string;
  currencyId: string;
  userRef: string;
  amount: string;
  destinationAddress: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ListCashoutsResponse {
  /** List of cashouts */
  items: Cashout[];
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
  /** Cashout ID */
  cashoutId: string;
}

export interface ApproveCashoutResponse {
  /** Updated cashout */
  cashout: Cashout;
}

export interface CancelCashoutRequest {
  /** Cashout ID */
  cashoutId: string;
}

export interface CancelCashoutResponse {
  /** Updated cashout */
  cashout: Cashout;
}

