import { z } from 'zod';

export const linkSchema = z.object({
  linkId: z.string().min(10),
  clicks: z.number().default(0),
  analyticsCode: z.string().trim().min(5),
  longUrl: z.string().url().trim().min(5),
  customCode: z.string().trim().min(4).max(25).optional(),
  creatorIpAddress: z.string().ip().optional().default('::1'),
  logs: z
    .array(
      z.object({
        ipAddress: z.string().ip(),
        timestamp: z.number(),
      }),
    )
    .optional(),
  // * This naming is followed to keep it backward compatible don't try to improve it Lol'
  enabled: z.boolean().default(true),
  timestamp: z.date().default(new Date()),
});

export const createLinkSchema = linkSchema.pick({
  longUrl: true,
  customCode: true,
});

export const updateLinkSchema = linkSchema.pick({
  linkId: true,
  longUrl: true,
  enabled: true,
});

export const myLinksSchema = z.array(z.string().min(10));

export type LinkSchemaType = z.infer<typeof linkSchema>;
export type CreateLinkSchemaType = z.infer<typeof createLinkSchema>;
export type MyLinkSchemaType = z.infer<typeof myLinksSchema>;
