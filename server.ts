import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { mw } from "request-ip";
import { catchAllRoutes } from "./api/controllers/link-controller";
import { Constants, APIEndpoints } from "./api/constants";
import linksRoute, { fetchLink } from "./api/routes/link-routes";
import analyticsRoutes from "./api/routes/analytics-routes";
import webhookRoutes from "./api/routes/webhook-routes";
import { AnalyticsService } from "./api/services/analytics-service";
import { DatabaseService } from "./api/services/database-service";
import { recaptchaMiddleware } from "./api/middlewares/recaptcha-middleware";
import { generateTooManyRequests } from "./api/utils/ejs-templates";
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");
import path from "path";

/**
 * Driver class to run the application
 */
class Server {
  /**
   * An instance of Express application
   */
  public app: express.Application;

  constructor() {
    config();
    this.app = express();
    this.initializeDatabase();
    this.mountMiddlewares();
    this.mountPublicRoutes();
    this.mountSecuredRoutes();
    this.initializeServer();
    AnalyticsService.getInstance();
  }

  /**
   * Mounts middleswares into the Express instance
   */
  private mountMiddlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(cookieParser());
    this.app.use(mw());

    this.app.use(
      expressCspHeader({
        directives: {
          "default-src": [SELF, INLINE],
          "script-src": [
            SELF,
            INLINE,
            "*.googletagmanager.com",
            "*.unpkg.com",
            "*.bootstrapcdn.com",
            "*.cloudflare.com",
            "*.jquery.com",
            "*.google.com",
            "*",
          ],
          "style-src": [
            SELF,
            INLINE,
            "*",
            "*.cloudflare.com",
            "*.bootstrapcdn.com",
          ],
          "img-src": ["data:", "*", SELF, INLINE],
          "worker-src": [NONE],
          "frame-src": ["*.google.com", "*"],
          "font-src": ["*.cloudflare.com", "*"],
          "connect-src": ["*"],
          "block-all-mixed-content": false,
        },
      })
    );
  }

  /**
   * Mounts unsecured, public routes into the Express instance
   */
  private async mountPublicRoutes() {
    const page429 = await generateTooManyRequests();
    const apiLimiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 60,
      message: page429,
    });

    this.app.use(
      `${APIEndpoints.BASE}${APIEndpoints.Webhook.BASE_ENDPOINT}`,
      apiLimiter,
      webhookRoutes
    );

    if (Constants.NODE_ENV !== "development") {
      this.app.post("*", recaptchaMiddleware);
      this.app.put("*", recaptchaMiddleware);
    }

    this.app.get(APIEndpoints.Links.GET_LINK, apiLimiter, fetchLink);

    this.app.use(
      `${APIEndpoints.BASE}${APIEndpoints.Links.BASE_ENDPOINT}`,
      apiLimiter,
      linksRoute
    );

    this.app.use(
      `${APIEndpoints.BASE}${APIEndpoints.Analytics.BASE_ENDPOINT}`,
      apiLimiter,
      analyticsRoutes
    );

    this.app.use(
      "/",
      express.static(path.join(__dirname, "..", "client", "public"))
    );

    this.app.use(
      "/analytics/:analyticsId",
      express.static(path.join(__dirname, "..", "client", "public"))
    );

    this.app.use(
      "/me",
      express.static(path.join(__dirname, "..", "client", "public"))
    );

    this.app.all(
      "*", catchAllRoutes

    )
  }

  /**
   * Mounts secured routes into the Express instance
   */
  private mountSecuredRoutes() { }

  /**
   * Establish a connection with the database
   */
  private initializeDatabase() {
    DatabaseService.getInstance();
  }

  /**
   * Starts a server of the Express instance
   */
  private initializeServer() {
    this.app.listen(Constants.PORT, () => {
      console.log(`Server started on ${Constants.PORT}.`);
    });
  }
}

new Server();
