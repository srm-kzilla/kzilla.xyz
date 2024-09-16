import { type Db, MongoClient } from 'mongodb';
import config from './env';

let db: Db;

async function initializeClient(): Promise<Db> {
  const client = await MongoClient.connect(config.DB_URL);

  return client.db();
}

export default async (): Promise<Db> => {
  if (!db) {
    db = await initializeClient();
  }
  return db;
};
