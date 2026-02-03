export interface CreateCreditRequest {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
  /** Amount to credit in units */
  amountUnits: string;
  /** Optional order ID */
  orderId?: string;
  /** Optional description */
  description?: string;
}

export interface CreditDebitBreakdownItem {
  participant: 'user' | 'pool';
  direction: 'debit' | 'credit';
  userRef?: string;
  amountUnits: string;
  description?: string;
}

export interface CreateCreditResponse {
  /** Journal entry ID */
  journalId: string;
  /** New balance in units */
  newBalanceUnits: string;
  /** Transaction breakdown */
  breakdown: CreditDebitBreakdownItem[];
}

