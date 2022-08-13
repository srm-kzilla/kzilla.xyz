export const API = {
  BASE_URL: "/api/v1",
  SHRINK_URL: "/links",
  FETCH_ANALYTICS: "/analytics/",
  MY_LINKS: "/links/me",
  KZILLA_URL: process.env.SVELTE_APP_DOMAIN_URL,
  ANALYTICS_URL: `${process.env.SVELTE_APP_DOMAIN_URL}analytics/`,
};
export const toastSuccess = {
  theme: {
    "--toastBarBackground": "#54a870",
  },
};

export const toastFail = {
  theme: {
    "--toastBarBackground": "#F0634D",
  },
};
