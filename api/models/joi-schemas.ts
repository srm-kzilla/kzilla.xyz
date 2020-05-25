import Joi from "@hapi/joi";

/**
 * Create link schema
 */
export const createLinkSchema = Joi.object({
  longUrl: Joi.string()
    .regex(/^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{3,6}$/)
    .required(),
});

/**
 * Fetch analytics schema
 */
export const fetchAnalyticsSchema = Joi.object({
  startDate: Joi.string()
    .regex(/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/)
    .required(),
  endDate: Joi.string()
    .regex(/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/)
    .required(),
});

/**
 * Update link schema
 */
export const updateLinkSchema = Joi.object({
  linkId: Joi.string()
    .regex(/^[A-Za-z]{12}$/)
    .required(),
  longUrl: Joi.string().regex(
    /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{3,6}$/
  ),
  enabled: Joi.bool(),
}).xor("longUrl", "enabled");
