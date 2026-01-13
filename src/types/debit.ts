export interface CreateDebitRequest {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
  /** Amount to debit */
  amount: string;
  /** Optional description */
  description?: string;
}

export interface CreateDebitResponse {
  /** Debit transaction */
  transaction: {
    _id: string;
    currencyId: string;
    userRef: string;
    type: 'debit';
    amount: string;
    description?: string;
    createdAt: string;
  };
  /** Updated balance */
  balance: string;
}

