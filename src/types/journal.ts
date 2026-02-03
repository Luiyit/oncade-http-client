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

export interface JournalPostingAccount {
  type: 'pool' | 'user';
  address?: string;
  userRef?: string;
}

export interface JournalPosting {
  account: JournalPostingAccount;
  deltaUnits: string;
}

export interface JournalEntry {
  _id: string;
  type: 'credit' | 'debit';
  postings: JournalPosting[];
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

