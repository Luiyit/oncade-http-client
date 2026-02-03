/**
 * Campaign API Types (v4)
 */

import type { SpendPermission } from './auth';

export interface GetCampaignRequest {
  campaignId: string;
}

export interface CampaignDetails {
  id: string;
  name: string;
  environment: string;
  status: string;
  businessId: string;
  address: string;
  chain: string;
  createdAt: string;
  updatedAt: string;
  totalAmountFunded: number;
  totalAmountPaidOut: number;
  availableToWithdraw: number;
}

export interface GetCampaignResponse {
  success: boolean;
  campaign: CampaignDetails;
}

export interface StartCampaignRequest {
  campaignId: string;
}

export interface StartCampaignResponse {
  success: boolean;
  message: string;
}

export interface StopCampaignRequest {
  campaignId: string;
}

export interface StopCampaignResponse {
  success: boolean;
  message: string;
}

export interface CreateCampaignEventRequest {
  campaignId: string;
  /** Event code (e.g. quest_complete) */
  eventCode: string;
  /** User reference */
  userRef: string;
}

export interface CreateCampaignEventResponse {
  success: boolean;
  message: string;
}

export interface ListCampaignEventsRequest {
  campaignId: string;
}

export interface CampaignEventConfig {
  code: string;
  name: string;
  payoutAmount: number;
}

export interface ListCampaignEventsResponse {
  success: boolean;
  events: CampaignEventConfig[];
}

export interface WithdrawCampaignRequest {
  campaignId: string;
}

export interface WithdrawCampaignResponse {
  success: boolean;
  message: string;
}

export interface GetUserCampaignRequest {
  campaignId: string;
  userId: string;
}

export interface GetUserCampaignResponse {
  success: boolean;
  data: {
    campaignId: string;
    userId: string;
    status: string;
    environment: string;
  };
}

export interface GetUserCampaignEventsRequest {
  campaignId: string;
  userId: string;
  limit?: number;
  offset?: number;
}

export interface CampaignUserTransaction {
  id: string;
  campaignId: string;
  userRef: string;
  eventCode: string;
  eventName: string;
  payoutAmount: number;
  transactionHash: string;
  createdAt: string;
}

export interface GetUserCampaignEventsResponse {
  success: boolean;
  data: {
    campaignId: string;
    userId: string;
    environment: string;
    transactions: CampaignUserTransaction[];
    pagination: {
      limit: number;
      offset: number;
      total: number;
      hasMore: boolean;
    };
  };
}

export interface InitiateCampaignUserLinkRequest {
  campaignId: string;
  email: string;
}

export interface InitiateCampaignUserLinkResponse {
  url: string;
  sessionKey: string;
}

export interface GetCampaignUserLinkDetailsRequest {
  campaignId: string;
  session: string;
}

export interface GetCampaignUserLinkDetailsResponse {
  campaignId: string;
  campaignName: string;
  prefilledEmail: string;
  status: string;
  userRef?: string;
  spendPermission?: SpendPermission;
}
