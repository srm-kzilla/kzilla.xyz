import * as MongoDB from "mongodb";
import { LoggerService } from "../services/logger-service";

/**
 * Drives a database connection in a singleton.
 */
export class DatabaseService {
  public database: MongoDB.Db | null = null;

  private client: MongoDB.MongoClient = new MongoDB.MongoClient(
    process.env.DB_URL || "", { useUnifiedTopology: true }
  );
  private static instance: DatabaseService;

  constructor() {
    this.initialize();
  }

  /**
   * Initializes the database
   */
  private async initialize(): Promise<any> {
    try {
      const client = await this.client.connect();
      this.database = client.db(process.env.DB_NAME);
      LoggerService.getInstance().LOGGER.info(
        `Established connection to database <${this.database.databaseName}>`
      );
    } catch (error) {
      LoggerService.getInstance().LOGGER.error(
        `Failed to established connection to database <${process.env.DB_NAME}>`
      );
    }
  }

  /**
   * The static method that controls the access to the DatabaseService instance.
   */
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }
}
