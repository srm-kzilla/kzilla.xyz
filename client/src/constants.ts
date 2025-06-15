export const API = {
  BASE_URL: "/api/v1",
  SHRINK_URL: "/links",
  FETCH_ANALYTICS: "/analytics/",
  MY_LINKS: "/links/me",
  KZILLA_URL: import.meta.env.VITE_DOMAIN_URL || "kzilla.xyz/",
  ANALYTICS_URL: `${
    import.meta.env.VITE_DOMAIN_URL || "kzilla.xyz/"
  }analytics/`,
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
