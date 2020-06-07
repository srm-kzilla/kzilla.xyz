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
    const startDateTs = new Date(startDate).getTime();
    const endDateTs = new Date(endDate).getTime();

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

    const clicksArray = await DatabaseService.getInstance()
      .database!!.collection(Collections.LINKS)
      .aggregate([
        {
          $match: {
            analyticsCode: analyticsCode,
          },
        },
        {
          $unwind: "$logs",
        },
        {
          $match: {
            $and: [
              {
                "logs.timestamp": {
                  $gte: startDateTs,
                  $lte: endDateTs,
                },
              },
            ],
          },
        },
        {
          $count: "clicks",
        },
      ])
      .toArray();

    var clicks = 0;
    if (clicksArray[0] && clicksArray[0].clicks) {
      clicks = clicksArray[0].clicks as number;
    }

    return AnalyticsService.getInstance().getAnalytics(
      startDate,
      endDate,
      result.shortCode,
      clicks
    );
  } catch (error) {
    throw error;
  }
};
