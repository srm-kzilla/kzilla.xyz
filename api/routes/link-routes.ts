import { Router, Request, Response } from "express";
import { APIEndpoints } from "../constants";
import {
  createLink,
  incrementClick,
  fetchLink as fetchLinkController,
  fetchMyLinks,
  updateLink,
} from "../controllers/link-controller";
import { CacheService } from "../services/cache-service";
import {
  generateRedirect,
  generatePageNotFound,
  generateForbidden,
} from "../utils/ejs-templates";
import { createLinkSchema, updateLinkSchema } from "../models/joi-schemas";

const router = Router();

/**
 * Creates a new link
 * @param req an Express Request object
 * @param res an Express Response object
 */
router.post(
  APIEndpoints.Links.CREATE_LINK,
  async (req: Request, res: Response) => {
    try {
      await createLinkSchema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json(error);
    }

    try {
      const result = await createLink(req.body.longUrl, req.clientIp);
      let linkIds = Array.isArray(req.cookies.linkIds)
        ? req.cookies.linkIds
        : [];
      console.log(
        "something",
        Array.isArray(req.cookies.linkIds),
        req.cookies.linkIds,
        linkIds
      );
      linkIds.push(result.linkId);
      res.cookie("linkIds", linkIds);
      console.log(req.cookies);
      return res.status(201).json(result);
    } catch (error) {
      if (error === 500) {
        res.status(500).send();
      }
    }
  }
);

/**
 * Handles redirection of the link
 * @param req an Express Request object
 * @param res an Express Response object
 */
export const fetchLink = async (req: Request, res: Response) => {
  let result = await CacheService.getInstance().get(req.params.shortCode);
  if (result) {
    if (!(result as any).enabled) {
      const html = await generateForbidden();
      return res.status(403).send(html);
    }
    incrementClick(req.params.shortCode, req.clientIp);
    const html = await generateRedirect(result);
    return res.status(200).send(html);
  }

  try {
    result = await fetchLinkController(req.params.shortCode);
    const html = await generateRedirect(result);
    incrementClick(req.params.shortCode, req.clientIp);
    return res.status(200).send(html);
  } catch (error) {
    if (error === 404) {
      const html = await generatePageNotFound();
      return res.status(404).send(html);
    } else if (error === 403) {
      const html = await generateForbidden();
      return res.status(403).send(html);
    } else {
      res.status(500).send();
    }
  }
};

/**
 * Fetches my links
 * @param req an Express Request object
 * @param res an Express Response object
 */
router.get(APIEndpoints.Links.MY_LINKS, async (req: Request, res: Response) => {
  console.log(req.cookies);
  if (!req.cookies.linkIds || req.cookies.linkIds.length === 0)
    return res.status(404).send();
  console.log(req.cookies.linkIds);
  try {
    const result = await fetchMyLinks(req.cookies.linkIds);
    res.status(200).json({
      links: result,
    });
  } catch (error) {
    console.log(error);
    res.status(error).send();
  }
});

/**
 * Flushes the entire cache into sewage
 * @param req an Express Request object
 * @param res an Express Response object
 */
router.put(
  APIEndpoints.Links.FLUSH_LINKS,
  async (req: Request, res: Response) => {
    console.log(req.headers["flush-code"], process.env.FLUSH_CODE);
    if (
      req.headers["flush-code"] &&
      req.headers["flush-code"] === process.env.FLUSH_CODE
    ) {
      await CacheService.getInstance().flush();
      return res.status(200).send();
    }
    return res.status(403).send();
  }
);

/**
 * Updates the longUrl based on linkId
 * @param req an Express Request object
 * @param res an Express Response object
 */
router.put(
  APIEndpoints.Links.UPDATE_LINK,
  async (req: Request, res: Response) => {
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
  }
);

export default router;
