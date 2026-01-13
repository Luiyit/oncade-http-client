/**
 * Campaign API Types
 */

/**
 * Request parameters for getting campaign details
 */
export interface GetCampaignRequest {
  /** Campaign ID */
  campaignId: string;
}

/**
 * Response containing campaign details
 */
export interface GetCampaignResponse {
  /** Campaign ID */
  campaignId: string;
  /** Campaign name */
  name: string;
  /** Campaign description */
  description?: string;
  /** Campaign status */
  status: string;
  /** Campaign start date */
  startDate?: string;
  /** Campaign end date */
  endDate?: string;
  /** Campaign budget */
  budget?: number;
  /** Campaign spent amount */
  spent?: number;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}

/**
 * Request parameters for starting a campaign
 */
export interface StartCampaignRequest {
  /** Campaign ID */
  campaignId: string;
}

/**
 * Response for starting a campaign
 */
export interface StartCampaignResponse {
  /** Success message */
  message: string;
  /** Updated campaign data */
  campaign: GetCampaignResponse;
}

/**
 * Request parameters for stopping a campaign
 */
export interface StopCampaignRequest {
  /** Campaign ID */
  campaignId: string;
}

/**
 * Response for stopping a campaign
 */
export interface StopCampaignResponse {
  /** Success message */
  message: string;
  /** Updated campaign data */
  campaign: GetCampaignResponse;
}

/**
 * Request parameters for creating a campaign event
 */
export interface CreateCampaignEventRequest {
  /** Campaign ID */
  campaignId: string;
  /** User ID */
  userId: string;
  /** Event type */
  eventType: string;
  /** Event data */
  eventData?: Record<string, string | number | boolean>;
  /** Event timestamp */
  timestamp?: string;
}

/**
 * Response for creating a campaign event
 */
export interface CreateCampaignEventResponse {
  /** Event ID */
  eventId: string;
  /** Campaign ID */
  campaignId: string;
  /** User ID */
  userId: string;
  /** Event type */
  eventType: string;
  /** Event data */
  eventData?: Record<string, string | number | boolean>;
  /** Event timestamp */
  timestamp: string;
  /** Creation timestamp */
  createdAt: string;
}

/**
 * Request parameters for listing campaign events
 */
export interface ListCampaignEventsRequest {
  /** Campaign ID */
  campaignId: string;
  /** Optional limit */
  limit?: number;
  /** Optional offset */
  offset?: number;
  /** Optional user ID filter */
  userId?: string;
  /** Optional event type filter */
  eventType?: string;
}

/**
 * Response for listing campaign events
 */
export interface ListCampaignEventsResponse {
  /** Array of events */
  events: CreateCampaignEventResponse[];
  /** Total count */
  total: number;
  /** Limit used */
  limit: number;
  /** Offset used */
  offset: number;
}

/**
 * Request parameters for withdrawing from a campaign
 */
export interface WithdrawCampaignRequest {
  /** Campaign ID */
  campaignId: string;
  /** Amount to withdraw */
  amount: number;
  /** Destination address */
  destinationAddress: string;
}

/**
 * Response for withdrawing from a campaign
 */
export interface WithdrawCampaignResponse {
  /** Withdrawal ID */
  withdrawalId: string;
  /** Campaign ID */
  campaignId: string;
  /** Amount withdrawn */
  amount: number;
  /** Destination address */
  destinationAddress: string;
  /** Withdrawal status */
  status: string;
  /** Creation timestamp */
  createdAt: string;
}

/**
 * Request parameters for getting user campaign info
 */
export interface GetUserCampaignRequest {
  /** Campaign ID */
  campaignId: string;
  /** User ID */
  userId: string;
}

/**
 * Response for getting user campaign info
 */
export interface GetUserCampaignResponse {
  /** User ID */
  userId: string;
  /** Campaign ID */
  campaignId: string;
  /** User participation status */
  status: string;
  /** User campaign balance */
  balance?: number;
  /** User campaign earned */
  earned?: number;
  /** Join timestamp */
  joinedAt: string;
  /** Last activity timestamp */
  lastActivityAt?: string;
}

/**
 * Request parameters for getting user campaign events
 */
export interface GetUserCampaignEventsRequest {
  /** Campaign ID */
  campaignId: string;
  /** User ID */
  userId: string;
  /** Optional limit */
  limit?: number;
  /** Optional offset */
  offset?: number;
  /** Optional event type filter */
  eventType?: string;
}

/**
 * Response for getting user campaign events
 */
export interface GetUserCampaignEventsResponse {
  /** Array of events */
  events: CreateCampaignEventResponse[];
  /** Total count */
  total: number;
  /** Limit used */
  limit: number;
  /** Offset used */
  offset: number;
}

/**
 * Request parameters for initiating campaign user link
 */
export interface InitiateCampaignUserLinkRequest {
  /** Campaign ID */
  campaignId: string;
  /** User email */
  email: string;
}

/**
 * Response for initiating campaign user link
 */
export interface InitiateCampaignUserLinkResponse {
  /** Link URL */
  url: string;
  /** Session key */
  sessionKey: string;
}

/**
 * Request parameters for getting campaign user link details
 */
export interface GetCampaignUserLinkDetailsRequest {
  /** Campaign ID */
  campaignId: string;
  /** Session key */
  session: string;
}

/**
 * Response for getting campaign user link details
 */
export interface GetCampaignUserLinkDetailsResponse {
  /** Session key */
  sessionKey: string;
  /** Link status */
  status: string;
  /** User ID (if linked) */
  userId?: string;
  /** User email */
  email: string;
  /** Campaign ID */
  campaignId: string;
  /** Creation timestamp */
  createdAt: string;
  /** Expiration timestamp */
  expiresAt: string;
}
