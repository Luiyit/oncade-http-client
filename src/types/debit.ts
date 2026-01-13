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

/**
 * Individual debit item in batch
 */
export interface BatchDebitItem {
  /** User reference */
  userRef: string;
  /** Debit amount */
  amount: string;
  /** Optional metadata */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Request parameters for batch debit
 */
export interface BatchDebitRequest {
  /** Currency ID */
  currencyId: string;
  /** Array of debit items */
  debits: BatchDebitItem[];
}

/**
 * Individual debit result in batch response
 */
export interface BatchDebitResult {
  /** User reference */
  userRef: string;
  /** Success status */
  success: boolean;
  /** Journal entry ID (if successful) */
  journalId?: string;
  /** Transaction ID (if successful) */
  transactionId?: string;
  /** New balance (if successful) */
  newBalance?: string;
  /** Error message (if failed) */
  error?: string;
}

/**
 * Response for batch debit
 */
export interface BatchDebitResponse {
  /** Currency ID */
  currencyId: string;
  /** Total number of debits */
  total: number;
  /** Number of successful debits */
  successful: number;
  /** Number of failed debits */
  failed: number;
  /** Array of results */
  results: BatchDebitResult[];
  /** Creation timestamp */
  createdAt: string;
}
