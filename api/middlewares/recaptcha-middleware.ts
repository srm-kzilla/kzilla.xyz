import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ErrorMessage } from "../constants";

/**
 * The ReCAPTCHA middleware
 * @param req an Express Request object
 * @param res an Express Response object
 * @param next the Next function
 */
export const recaptchaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = "https://www.google.com/recaptcha/api/siteverify";

  const result = await axios.post(
    url,
    {},
    {
      params: {
        secret: process.env.RECAPTCHA_SECRET,
        response: req.headers["x-recaptcha-token"],
      },
    }
  );
  if (result.data.success) return next();

  return res.status(ErrorMessage.Recaptcha.INVALID_RECAPTCHA.code).json({
    success: false,
    message: ErrorMessage.Recaptcha.INVALID_RECAPTCHA.error,
  });
};
