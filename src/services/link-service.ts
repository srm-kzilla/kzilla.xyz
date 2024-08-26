import type { WithId } from 'mongodb';
import type { LinkSchemaType } from '../models/links';
import db from '../utils/db';
import { BackendError } from '../utils/errors';

export async function fetchLink({
  shortCode,
  linkId,
  analyticsCode,
}: {
  shortCode?: string;
  linkId?: string;
  analyticsCode?: string;
}) {
  try {
    const linksCollection = (await db()).collection<LinkSchemaType>('links');

    return await linksCollection.findOne(
      {
        $or: [
          { customCode: shortCode },
          { linkId: linkId },
          { analyticsCode: analyticsCode },
        ],
      },
      {
        projection: {
          _id: 0,
          logs: 0,
          creatorIpAddress: 0,
        },
      },
    );
  } catch (err) {
    throw new BackendError('INTERNAL_ERROR', {
      message: 'Error while fetch a link',
      details: err,
    });
  }
}

export async function createLink(
  longUrl: string,
  shortCode: string,
  analyticsCode: string,
  linkId: string,
  ipAddress: string,
) {
  try {
    const linksCollection = (await db()).collection<LinkSchemaType>('links');

    await linksCollection.insertOne({
      linkId,
      longUrl,
      customCode: shortCode,
      analyticsCode,
      clicks: 0,
      creatorIpAddress: ipAddress,
      enabled: true,
      timestamp: new Date(),
      logs: [],
    });
    return;
  } catch (err) {
    throw new BackendError('INTERNAL_ERROR', {
      message: 'Error while fetch a link',
      details: err,
    });
  }
}

export async function fetchMultipleLinks(
  linkIds: string[],
): Promise<LinkSchemaType[]> {
  try {
    const linksCollection = (await db()).collection<LinkSchemaType>('links');

    return await linksCollection
      .find(
        {
          linkId: { $in: linkIds },
        },
        {
          projection: {
            _id: 0,
            logs: 0,
            creatorIpAddress: 0,
          },
        },
      )
      .toArray();
  } catch (err) {
    throw new BackendError('INTERNAL_ERROR', {
      message: 'Error while fetch a link',
      details: err,
    });
  }
}

export async function updateLink(
  linkId: string,
  longUrl: string,
  enabled: boolean,
) {
  let result: WithId<LinkSchemaType> | null = null;
  const linksCollection = (await db()).collection<LinkSchemaType>('links');

  try {
    result = await linksCollection.findOneAndUpdate(
      {
        linkId: linkId,
      },
      {
        $set: {
          longUrl: longUrl,
          enabled: enabled,
        },
      },
      {
        returnDocument: 'after',
      },
    );
  } catch (err) {
    throw new BackendError('INTERNAL_ERROR', {
      message: 'Error while updating the link',
      details: err,
    });
  }

  if (!result) {
    throw new BackendError('NOT_FOUND', {
      message: 'Link not found',
    });
  }

  return result.customCode;
}
