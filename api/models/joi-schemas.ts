import Joi from "@hapi/joi";

/**
 * Create link schema
 */
export const createLinkSchema = Joi.object({
  longUrl: Joi.string().uri().required(),
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
