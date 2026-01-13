/**
 * Game API Types
 */

/**
 * Request parameters for getting game information
 */
export interface GetGameRequest {
  // No parameters required - uses API key from headers
}

/**
 * Response containing game information
 */
export interface GetGameResponse {
  /** Unique game identifier */
  gameId: string;
  /** Game name */
  name: string;
  /** Game description */
  description: string;
  /** Main game image URL */
  imageUrl: string;
  /** Small thumbnail image URL */
  smallImageUrl: string;
  /** Store page image URL */
  storeImageUrl: string;
  /** Demo URL */
  demoUrl?: string;
  /** Steam App ID */
  steamAppId?: string;
  /** Discord server URL */
  discordUrl?: string;
  /** Array of screenshot URLs */
  screenshots: string[];
  /** Game approval status */
  status: string;
  /** Environment (test or production) */
  environment: string;
  /** Affiliate rate percentage */
  affiliateRate: number;
  /** Whether tipping is enabled */
  enableTip: boolean;
  /** Whether game is visible in store */
  isVisible: boolean;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}
