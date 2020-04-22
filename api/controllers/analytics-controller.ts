import { DatabaseService } from "../services/database-service";
import { AnalyticsService } from "../services/analytics-service";
import { Collections } from "../constants";

/**
 * Fetches analytics for provided analytics code
 * @param analyticsCode analytics code of a shrunk link
 * @param startDate the start date of reports as YYYY-MM-DD
 * @param endDate the end date of reports as YYYY-MM-DD
 */
export const fetchAnalytics = async (
  analyticsCode: string,
  startDate: string,
  endDate: string
) => {
  try {
    const result = await DatabaseService.getInstance()
      .database!!.collection(Collections.LINKS)
      .findOne(
        { analyticsCode: analyticsCode },
        {
          projection: {
            _id: 0,
            shortCode: 1,
            longUrl: 1,
            clicks: 1,
          },
        }
      );

    if (!result) {
      throw 404;
    }

    return AnalyticsService.getInstance().getAnalytics(
      startDate,
      endDate,
      result.shortCode,
      result.clicks
    );
  } catch (error) {
    throw 500;
  }
};
