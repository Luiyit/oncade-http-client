export interface ListJournalsRequest {
  /** Currency ID */
  currencyId?: string;
  /** User reference */
  userRef?: string;
  /** Page number */
  page?: number;
  /** Items per page */
  limit?: number;
}

export interface JournalEntry {
  _id: string;
  currencyId: string;
  userRef: string;
  type: 'credit' | 'debit';
  amount: string;
  description?: string;
  createdAt: string;
}

export interface ListJournalsResponse {
  /** List of journal entries */
  items: JournalEntry[];
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

