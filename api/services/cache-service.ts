import NodeCache from "node-cache";
import { Constants } from "../constants";

/**
 * Handles caching in a static, performant instance.
 */
export class CacheService {
  private static instance: CacheService;
  public cache: NodeCache;

  private constructor(ttlSeconds: number = Constants.TTLSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  /**
   * The static method that controls the access to the CacheService instance.
   */
  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }

    return CacheService.instance;
  }

  /**
   * Fetches a value of the key from cache. If the value is not found, resolves a store function and updates the value of the key.
   * @param key the key string to search value of
   */
  async get(key: string) {
    return this.cache.get(key);
  }

  /**
   * Caches value to a key
   * @param key the key string to set value of
   * @param value the value to be set
   */
  async set(key: string, value: any) {
    return this.cache.set(key, value);
  }

  /**
   * Deletes keys from the cache
   * @param keys a string containing the key or an array of keys
   */
  async del(keys: string | string[]) {
    return this.cache.del(keys);
  }

  /**
   * Flushes the entire cache into sewage
   */
  flush() {
    return this.cache.flushAll();
  }
}
