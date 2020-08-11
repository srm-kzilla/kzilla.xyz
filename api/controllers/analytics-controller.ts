import { DatabaseService } from "../services/database-service";
import { AnalyticsService } from "../services/analytics-service";
import { Collections } from "../constants";
import moment from "moment";

/**
 * Fetches analytics for provided analytics code
 * @param analyticsCode analytics code of a shrunk link
 * @param startDate the start date of reports as YYYY-MM-DD
 * @param endDate the end date of reports as YYYY-MM-DD
 */
export const fetchAnalytics = async (
  analyticsCode: string,
  startDate: string | undefined,
  endDate: string | undefined
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
            timestamp: 1,
          },
        }
      );

    if (!result) {
      throw 404;
    }

    const startDateTs = startDate
      ? new Date(startDate).getTime()
      : result.timestamp;
    const endDateTs = endDate ? new Date(endDate).getTime() : Date.now();

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
      moment(startDateTs).format("YYYY-MM-DD"),
      moment(endDateTs).format("YYYY-MM-DD"),
      result.shortCode,
      clicks
    );
  } catch (error) {
    throw error;
  }
};
