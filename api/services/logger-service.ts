import pino, { Logger } from "pino";

/**
 * Handles logging in a static, performant, low overhead instance.
 */
export class LoggerService {
  private static instance: LoggerService;
  public LOGGER: Logger;

  private constructor() {
    this.LOGGER = pino(
      process.env.NODE_ENV === "development"
        ? {
            prettyPrint: { colorize: true },
          }
        : {}
    );
  }

  /**
   * The static method that controls the access to the LoggerService instance.
   */
  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }

    return LoggerService.instance;
  }

  /**
   * Formats error messages for the sake of consistency
   * @param log A brief log prefix
   * @param error A detailed error string, usually the error description of a rejected promise.
   */
  public formatLog(log: string, error: string): string {
    return `${log}: ${error}`;
  }
}
