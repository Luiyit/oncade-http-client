export interface CreateCreditRequest {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
  /** Amount to credit */
  amount: string;
  /** Optional description */
  description?: string;
}

export interface CreateCreditResponse {
  /** Credit transaction */
  transaction: {
    _id: string;
    currencyId: string;
    userRef: string;
    type: 'credit';
    amount: string;
    description?: string;
    createdAt: string;
  };
  /** Updated balance */
  balance: string;
}

