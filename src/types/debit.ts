import { CreditDebitBreakdownItem } from './credit';

export interface CreateDebitRequest {
  /** Currency ID */
  currencyId: string;
  /** User reference */
  userRef: string;
  /** Amount to debit in units */
  amountUnits: string;
  /** Reason: 'refund' or 'adjustment' */
  reason?: 'refund' | 'adjustment';
  /** Optional order ID */
  orderId?: string;
  /** Optional description */
  description?: string;
}

export interface CreateDebitResponse {
  /** Journal entry ID */
  journalId: string;
  /** New balance in units */
  newBalanceUnits: string;
  /** Transaction breakdown */
  breakdown: CreditDebitBreakdownItem[];
}

/** Recipient for batch debit: credit to a user */
export interface BatchDebitRecipientUser {
  userRef: string;
  amountUnits: string;
  description?: string;
}

/** Recipient for batch debit: credit to pool */
export interface BatchDebitRecipientPool {
  toPool: true;
  amountUnits: string;
  description?: string;
}

export type BatchDebitRecipient = BatchDebitRecipientUser | BatchDebitRecipientPool;

/**
 * Request parameters for batch debit (debit from one source, distribute to many)
 */
export interface BatchDebitRequest {
  /** Currency ID */
  currencyId: string;
  /** Source user to debit from */
  sourceUserRef: string;
  /** Recipients (users or pool) */
  recipients: BatchDebitRecipient[];
  /** Optional order ID */
  orderId?: string;
  /** Optional note */
  note?: string;
}

/**
 * Response for batch debit
 */
export interface BatchDebitResponse {
  /** Journal entry ID */
  journalId: string;
  /** New balance of source user in units */
  newBalanceUnits: string;
  /** Transaction breakdown */
  breakdown: CreditDebitBreakdownItem[];
}
