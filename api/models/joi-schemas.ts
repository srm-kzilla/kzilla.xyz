import Joi from "@hapi/joi";

/**
 * Create link schema
 */
export const createLinkSchema = Joi.object({
  longUrl: Joi.string()
    .regex(
      /^(?:(?!.*kzilla\.xyz).*?(http|https|ftp):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:/?#[\]@!\$&'()*+,;=]+$/
    )
    .required()
    .trim(),
  customCode: Joi.string()
    .regex(/^(?=.*[A-Za-z])[^-_][-\w]{3,25}$/)
    .trim(),
});

/**
 * Fetch analytics schema
 */
export const fetchAnalyticsSchema = Joi.object({
  startDate: Joi.string().regex(/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/),
  endDate: Joi.string().regex(/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/),
});

/**
 * Update link schema
 */
export const updateLinkSchema = Joi.object({
  linkId: Joi.string()
    .regex(/^[A-Za-z]{12}$/)
    .required(),
  longUrl: Joi.string().regex(
    /^(?:(?!.*kzilla\.xyz).*?(http|https|ftp):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:/?#[\]@!\$&'()*+,;=]+$/
  ),
  enabled: Joi.bool(),
}).xor("longUrl", "enabled");
