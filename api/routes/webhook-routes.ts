import { Router, Request, Response } from "express";
import { APIEndpoints } from "../constants";
import { createLink } from "../controllers/link-controller";
import { createLinkSchema } from "../models/joi-schemas";

const router = Router();
router.post(
  APIEndpoints.Webhook.CREATE_LINK,
  async (req: Request, res: Response) => {
    if (req.headers.authorization !== process.env.WEBHOOK_TOKEN)
      return res.status(401).send();

    try {
      await createLinkSchema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json(error);
    }

    try {
      const result = await createLink(req.body.longUrl, req.clientIp, req.body.customCode);
      return res.status(201).json(result);
    } catch (error) {
      res.status(error.code).json(error);
    }
  }
);

export default router;
