import { Router, Request, Response } from "express";
import { APIEndpoints } from "../constants";
import { fetchAnalytics } from "../controllers/analytics-controller";
import { fetchAnalyticsSchema } from "../models/joi-schemas";

const router = Router();

/**
 * Fetches analytics for a URL
 * @param req an Express Request object
 * @param res an Express Response object
 */
router.get(
  APIEndpoints.Analytics.FETCH_ANALYTICS,
  async (req: Request, res: Response) => {
    try {
      await fetchAnalyticsSchema.validateAsync(req.query);
    } catch (error) {
      return res.status(400).json(error);
    }

    try {
      const data = await fetchAnalytics(
        req.params.analyticsCode,
        req.query.startDate as string,
        req.query.endDate as string
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      if (typeof error === "number") {
      	return res.status(error).send();
      }
      return res.status(500).send();
    }
  }
);

export default router;
