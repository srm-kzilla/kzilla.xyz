import { config } from 'dotenv';
import { z } from 'zod';
import { MONGODB_URI_REGEX_PATTERN } from './contants';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).optional().default('5050'),
  TTL_SECONDS: z.number().optional().default(21600),
  DB_URL: z.string().refine(value => {
    return MONGODB_URI_REGEX_PATTERN.test(value);
  }, 'Invalid MongoDB URI'),
  DB_NAME: z.string(),
  FLUSH_CODE: z.string().optional().default('Kz-Shortner-Got-Too-Cool'),
});

const parsedSchema = envSchema.parse(process.env);

export type EnvSchemaType = z.infer<typeof envSchema>;

export default {
  NODE_ENV: parsedSchema.NODE_ENV,
  PORT: parsedSchema.PORT,
  TTL_SECONDS: parsedSchema.TTL_SECONDS,
  DB_URL: parsedSchema.DB_URL,
  DB_NAME: parsedSchema.DB_NAME,
  FLUSH_CODE: parsedSchema.FLUSH_CODE,
};
