/**
 * Interface for Link
 */
export interface Link {
  longUrl: string;
  shortCode: string;
  analyticsCode: string;
  linkId: string;
  clicks: number;
  enabled: boolean;
  logs: Log[];
  timestamp: number;
  creatorIpAddress: string | undefined;
}

/**
 * Interface for Log
 */
export interface Log {
  ipAddress: string | undefined;
  timestamp: number;
}
