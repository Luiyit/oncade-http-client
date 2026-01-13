import { HttpClient } from '../http/client';
import { generateIdempotencyKey } from '../utils';
import {
  GetCampaignRequest,
  GetCampaignResponse,
  StartCampaignRequest,
  StartCampaignResponse,
  StopCampaignRequest,
  StopCampaignResponse,
  CreateCampaignEventRequest,
  CreateCampaignEventResponse,
  ListCampaignEventsRequest,
  ListCampaignEventsResponse,
  WithdrawCampaignRequest,
  WithdrawCampaignResponse,
  GetUserCampaignRequest,
  GetUserCampaignResponse,
  GetUserCampaignEventsRequest,
  GetUserCampaignEventsResponse,
  InitiateCampaignUserLinkRequest,
  InitiateCampaignUserLinkResponse,
  GetCampaignUserLinkDetailsRequest,
  GetCampaignUserLinkDetailsResponse,
} from '../types';

export class CampaignAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get campaign details
   * @param request - Campaign request parameters
   * @returns Promise with campaign details response
   */
  async getCampaign(request: GetCampaignRequest): Promise<GetCampaignResponse> {
    if (!request.campaignId) {
      throw new Error('Campaign ID is required');
    }
    const response = await this.httpClient.get<GetCampaignResponse>(
      `/v1/campaign/${request.campaignId}`
    );
    return response.data;
  }

  /**
   * Start a campaign
   * @param request - Start campaign request parameters
   * @returns Promise with start campaign response
   */
  async startCampaign(request: StartCampaignRequest): Promise<StartCampaignResponse> {
    if (!request.campaignId) {
      throw new Error('Campaign ID is required');
    }
    const response = await this.httpClient.put<StartCampaignResponse>(
      `/v1/campaign/${request.campaignId}/start`,
      {},
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * Stop a campaign
   * @param request - Stop campaign request parameters
   * @returns Promise with stop campaign response
   */
  async stopCampaign(request: StopCampaignRequest): Promise<StopCampaignResponse> {
    if (!request.campaignId) {
      throw new Error('Campaign ID is required');
    }
    const response = await this.httpClient.put<StopCampaignResponse>(
      `/v1/campaign/${request.campaignId}/stop`,
      {},
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * Create a campaign event
   * @param request - Create event request parameters
   * @returns Promise with created event response
   */
  async createCampaignEvent(request: CreateCampaignEventRequest): Promise<CreateCampaignEventResponse> {
    if (!request.campaignId || !request.userId || !request.eventType) {
      throw new Error('Campaign ID, user ID, and event type are required');
    }
    const { campaignId, ...eventData } = request;
    const response = await this.httpClient.post<CreateCampaignEventResponse>(
      `/v1/campaign/${campaignId}/events`,
      eventData,
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * List campaign events
   * @param request - List events request parameters
   * @returns Promise with events list response
   */
  async listCampaignEvents(request: ListCampaignEventsRequest): Promise<ListCampaignEventsResponse> {
    if (!request.campaignId) {
      throw new Error('Campaign ID is required');
    }
    const { campaignId, ...params } = request;
    const response = await this.httpClient.get<ListCampaignEventsResponse>(
      `/v1/campaign/${campaignId}/events`,
      { params }
    );
    return response.data;
  }

  /**
   * Withdraw from a campaign
   * @param request - Withdrawal request parameters
   * @returns Promise with withdrawal response
   */
  async withdrawFromCampaign(request: WithdrawCampaignRequest): Promise<WithdrawCampaignResponse> {
    if (!request.campaignId || !request.amount || !request.destinationAddress) {
      throw new Error('Campaign ID, amount, and destination address are required');
    }
    const { campaignId, ...withdrawData } = request;
    const response = await this.httpClient.post<WithdrawCampaignResponse>(
      `/v1/campaign/${campaignId}/withdraw`,
      withdrawData,
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * Get user campaign information
   * @param request - User campaign request parameters
   * @returns Promise with user campaign response
   */
  async getUserCampaign(request: GetUserCampaignRequest): Promise<GetUserCampaignResponse> {
    if (!request.campaignId || !request.userId) {
      throw new Error('Campaign ID and user ID are required');
    }
    const response = await this.httpClient.get<GetUserCampaignResponse>(
      `/v1/campaign/${request.campaignId}/user/${request.userId}`
    );
    return response.data;
  }

  /**
   * Get user campaign events
   * @param request - User campaign events request parameters
   * @returns Promise with user campaign events response
   */
  async getUserCampaignEvents(request: GetUserCampaignEventsRequest): Promise<GetUserCampaignEventsResponse> {
    if (!request.campaignId || !request.userId) {
      throw new Error('Campaign ID and user ID are required');
    }
    const { campaignId, userId, ...params } = request;
    const response = await this.httpClient.get<GetUserCampaignEventsResponse>(
      `/v1/campaign/${campaignId}/user/${userId}/events`,
      { params }
    );
    return response.data;
  }

  /**
   * Initiate campaign user link
   * @param request - Initiate link request parameters
   * @returns Promise with link initiation response
   */
  async initiateCampaignUserLink(request: InitiateCampaignUserLinkRequest): Promise<InitiateCampaignUserLinkResponse> {
    if (!request.campaignId || !request.email) {
      throw new Error('Campaign ID and email are required');
    }
    const { campaignId, ...linkData } = request;
    const response = await this.httpClient.post<InitiateCampaignUserLinkResponse>(
      `/v1/campaign/${campaignId}/users/link/initiate`,
      linkData,
      {
        headers: {
          'Idempotency-Key': generateIdempotencyKey(),
        },
      }
    );
    return response.data;
  }

  /**
   * Get campaign user link details
   * @param request - Get link details request parameters
   * @returns Promise with link details response
   */
  async getCampaignUserLinkDetails(request: GetCampaignUserLinkDetailsRequest): Promise<GetCampaignUserLinkDetailsResponse> {
    if (!request.campaignId || !request.session) {
      throw new Error('Campaign ID and session key are required');
    }
    const { campaignId, ...params } = request;
    const response = await this.httpClient.get<GetCampaignUserLinkDetailsResponse>(
      `/v1/campaign/${campaignId}/users/link/details`,
      { params }
    );
    return response.data;
  }
}
