export interface Currency {
  _id: string;
  code: string;
  name: string;
  status: 'active' | 'inactive';
  baseUnitsPerVcUnit: string;
  centralWalletAddress: string;
}

export interface CreateCurrencyRequest {
  /** Currency code (e.g., "GEM") */
  code: string;
  /** Currency display name */
  name: string;
  /** Base units per virtual currency unit */
  baseUnitsPerVcUnit: string;
  /** Central wallet address */
  centralWalletAddress: string;
}

export interface CreateCurrencyResponse {
  /** Created currency */
  currency: Currency;
}

export interface ListCurrenciesRequest {
  /** Page number */
  page?: number;
  /** Items per page */
  limit?: number;
}

export interface ListCurrenciesResponse {
  /** List of currencies */
  items: Currency[];
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

export interface UpdateCurrencyRequest {
  /** Currency ID */
  currencyId: string;
  /** Optional name */
  name?: string;
  /** Optional status */
  status?: 'active' | 'inactive';
  /** Optional base units per VC unit */
  baseUnitsPerVcUnit?: string;
  /** Optional central wallet address */
  centralWalletAddress?: string;
}

export type UpdateCurrencyResponse = Currency;

