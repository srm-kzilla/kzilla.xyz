import { Collections } from "../constants";
import { Log, Link } from "../models/link-model";
import { CacheService } from "../services/cache-service";
import { DatabaseService } from "../services/database-service";
import { generateRandomCode } from "../utils/link-helpers";
import * as metaget from "metaget";

/**
 * Handles creation of links
 * @param longUrl the long URL to be shrunk
 * @param ipAddress ip address of the creator
 */
export const createLink = async (
  longUrl: string,
  ipAddress: string | undefined
): Promise<any> => {
  const shortCode = generateRandomCode(5);
  const analyticsCode = generateRandomCode(5);
  const linkId = generateRandomCode(12);

  const result = await DatabaseService.getInstance()
    .database!!.collection(Collections.LINKS)
    .find({
      $or: [
        { shortCode: shortCode },
        { analyticsCode: analyticsCode },
        { linkId: linkId },
      ],
    })
    .toArray();

  if (result.length !== 0) return createLink(longUrl, ipAddress);

  const document: Link = {
    linkId: linkId,
    shortCode: shortCode,
    analyticsCode: analyticsCode,
    clicks: 0,
    creatorIpAddress: ipAddress,
    enabled: true,
    logs: [],
    longUrl: longUrl,
    timestamp: Date.now(),
  };

  try {
    await DatabaseService.getInstance()
      .database!!.collection(Collections.LINKS)
      .insertOne(document);
    return {
      linkId: linkId,
      shortCode: shortCode,
      analyticsCode: analyticsCode,
      longUrl: longUrl,
    };
  } catch (error) {
    throw 500;
  }
};

/**
 * Fetches long URL pages for short codes
 * @param shortCode short code
 */
export const fetchLink = async (shortCode: string) => {
  const result = await DatabaseService.getInstance()
    .database!!.collection(Collections.LINKS)
    .findOne(
      { shortCode: shortCode },
      {
        projection: {
          _id: 0,
          enabled: 1,
          longUrl: 1,
        },
      }
    );

  if (!result) {
    throw 404;
  }

  if (!result.enabled) {
    throw 403;
  }

  try {
    if(result.longUrl.startsWith("https://"))
    result.meta = await metaget.fetch(result.longUrl);
    else
    result.meta = await metaget.fetch("https://" + result.longUrl);
  } catch (e) {
    result.meta = {};
  }

  await CacheService.getInstance().set(shortCode, result);
  return result;
};

/**
 * Fetches existing links from linkIds
 * @param linkIds an array of linkId
 */
export const fetchMyLinks = async (linkIds: string[]) => {
  try {
    const result = await DatabaseService.getInstance()
      .database!!.collection(Collections.LINKS)
      .find({ linkId: { $in: linkIds } })
      .project({
        _id: 0,
        shortCode: 1,
        analyticsCode: 1,
        enabled: 1,
        clicks: 1,
        creatorIpAddress: 1,
        longUrl: 1,
        linkId: 1,
        timestamp: 1,
      })
      .toArray();
    if (result.length === 0) throw 404;
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param shortCode short code
 * @param ipAddress ip address of user
 */
export const incrementClick = async (
  shortCode: string,
  ipAddress: string | undefined
) => {
  const log: Log = {
    ipAddress: ipAddress,
    timestamp: Date.now(),
  };
  return DatabaseService.getInstance()
    .database!!.collection(Collections.LINKS)
    .findOneAndUpdate(
      {
        shortCode: shortCode,
      },
      {
        $inc: { clicks: 1 },
        $push: { logs: log },
      }
    );
};

export const updateLink = async (
  linkId: string,
  longUrl: string,
  enabled: boolean
) => {
  let query: any = {
    $set: { longUrl: longUrl },
  };
  if (longUrl === undefined)
    query = {
      $set: { enabled: enabled },
    };

  const result = await DatabaseService.getInstance()
    .database!!.collection(Collections.LINKS)
    .findOneAndUpdate(
      {
        linkId: linkId,
      },
      query,
      {
        projection: {
          _id: 0,
          shortCode: 1,
          analyticsCode: 1,
          clicks: 1,
          creatorIpAddress: 1,
          longUrl: 1,
          timestamp: 1,
          linkId: 1,
        },
      }
    );

  if (!result.value) throw 404;

  CacheService.getInstance().del(result.value.shortCode);
  return result.value;
};
