/**
 * Defines Constants for API
 */
export const Constants = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  TTLSeconds: Number(process.env.TTL_SECONDS) || 60 * 60 * 6,
};

/**
 * Defines Endpoints for API
 */
export const APIEndpoints = {
  BASE: "/api/v1",
  Links: {
    BASE_ENDPOINT: "/links",
    CREATE_LINK: "/",
    UPDATE_LINK: "/",
    GET_LINK: "/:shortCode([A-Za-z0-9_-]{4,75})",
    MY_LINKS: "/me",
    FLUSH_LINKS: "/flush",
  },
  Analytics: {
    BASE_ENDPOINT: "/analytics",
    FETCH_ANALYTICS: "/:analyticsCode([A-Za-z]{5})",
  },
  Webhook: {
    BASE_ENDPOINT: "/webhook",
    CREATE_LINK: "/link",
  },
};

/**
 * Defines Collection names in database
 */
export const Collections = {
  LINKS: "links",
};

/**
 * Defines properties for error messages
 */
export const ErrorMessage = {
  Recaptcha: {
    INVALID_RECAPTCHA: {
      code: 401,
      error: "ERR_INVALID_RECAPTCHA",
      log: "ERR_INVALID_RECAPTCHA",
    },
  },
  RateLimit: {
    RATE_LIMIT_EXCEEDED: {
      code: 429,
      error: "ERR_RATE_LIMIT_EXCEEDED",
      log: "ERR_RATE_LIMIT_EXCEEDED",
    },
  },
  Link: {
    INVALID_ID_TOKEN: {
      code: 401,
      error: "INVALID_ID_TOKEN",
      log: "INVALID_ID_TOKEN",
    },
    EXPIRED_ID_TOKEN: {
      code: 401,
      error: "EXPIRED_ID_TOKEN",
      log: "EXPIRED_ID_TOKEN",
    },
    INVALID_TICKET: {
      code: 401,
      error: "INVALID_TICKET",
      log: "INVALID_TICKET",
    },
  },
};
