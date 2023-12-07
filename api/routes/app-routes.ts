import { Router, Request, Response } from "express";
import { APIEndpoints } from "../constants";
import {
  createLink,
  fetchMyLinks,
  updateLink,
} from "../controllers/link-controller";
import { createLinkSchema, updateLinkSchema } from "../models/joi-schemas";

const router = Router();
router.get(APIEndpoints.App.MY_LINKS, async (req: Request, res: Response) => {
  if (!req.body.linkIds || req.body.linkIds.length === 0)
    return res.status(404).send();

  try {
    const result = await fetchMyLinks(req.body.linkIds);
    res.status(200).json({
      links: result,
    });
  } catch (error) {
    console.log(error);
    res.status(error).send();
  }
});

router.post(APIEndpoints.App.CREATE, async (req: Request, res: Response) => {
  try {
    await createLinkSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    const result = await createLink(
      req.body.longUrl,
      req.clientIp,
      req.body.customCode
    );
    let linkIds = Array.isArray(req.body.linkIds) ? req.body.linkIds : [];
    linkIds.push(result.linkId);

    return res.status(201).json({
      link: result,
      linkIds,
    });
  } catch (error) {
    res.status(error.code).send(error);
  }
});

router.put(APIEndpoints.App.UPDATE, async (req: Request, res: Response) => {
  try {
    await updateLinkSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    const result = await updateLink(
      req.body.linkId,
      req.body.longUrl,
      req.body.enabled
    );
    return res.status(200).json(result);
  } catch (error) {
    res.status(error).send();
  }
});

export default router;
