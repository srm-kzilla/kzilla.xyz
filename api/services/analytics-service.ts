import { google, analyticsreporting_v4 } from "googleapis";
import { readableReports } from "../utils/analytics-helpers";
/**
 * Handles analytics from Google APIs.
 */
export class AnalyticsService {
  private static instance: AnalyticsService;
  private _scopes = "https://www.googleapis.com/auth/analytics.readonly";
  private _jwt: any;
  private view_id = process.env.GAPI_VIEW_ID;

  private constructor() {
    this._jwt = new google.auth.JWT(
      process.env.GAPI_CLIENT_EMAIL,
      undefined,
      process.env.GAPI_PRIVATE_KEY,
      this._scopes
    );
  }

  /**
   * Fetches analytics reports for a short code
   * @param startDate the start date of reports as YYYY-MM-DD
   * @param endDate the end date of reports as YYYY-MM-DD
   * @param shortCode short code to generate reports for
   * @param clicks number of clicks on link
   */
  async getAnalytics(
    startDate: string,
    endDate: string,
    shortCode: string,
    clicks: number
  ) {
    const dateRanges: analyticsreporting_v4.Schema$DateRange[] = [
      {
        startDate: startDate,
        endDate: endDate,
      },
    ];

    const filtersExpression: string = `ga:pagePath==/${shortCode}`;

    const results = await google.analyticsreporting("v4").reports.batchGet({
      auth: this._jwt,
      requestBody: {
        reportRequests: [
          {
            viewId: "ga:" + this.view_id,
            dateRanges: dateRanges,
            dimensions: [
              {
                name: "ga:source",
              },
            ],
            metrics: [
              {
                expression: "ga:pageviews",
              },
            ],
            filtersExpression: filtersExpression,
          },
          {
            viewId: "ga:" + this.view_id,
            dateRanges: dateRanges,
            dimensions: [{ name: "ga:city" }],
            metrics: [
              {
                expression: "ga:pageviews",
              },
            ],
            filtersExpression: filtersExpression,
          },
          {
            viewId: "ga:" + this.view_id,
            dateRanges: dateRanges,
            dimensions: [{ name: "ga:browser" }],
            metrics: [
              {
                expression: "ga:pageviews",
              },
            ],
            filtersExpression: filtersExpression,
          },
          {
            viewId: "ga:" + this.view_id,
            dateRanges: dateRanges,
            dimensions: [{ name: "ga:operatingSystem" }],
            metrics: [
              {
                expression: "ga:pageviews",
              },
            ],
            filtersExpression: filtersExpression,
          },
        ],
      },
    });

    if (results.data.reports) {
      return readableReports(results.data.reports, clicks);
    }
  }

  /**
   * The static method that controls the access to the AuthService instance.
   */
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }

    return AnalyticsService.instance;
  }
}
