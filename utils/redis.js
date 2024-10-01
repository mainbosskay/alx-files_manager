import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.instClient = createClient();
    this.isConnected = true;
    this.instClient.on('error', (err) => {
      console.error('Redis client connection failed:', err.message || err.toString());
      this.isConnected = false;
    });
    this.instClient.on('connect', () => {
      this.isConnected = true;
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    return promisify(this.instClient.GET).bind(this.instClient)(key);
  }

  async set(key, value, duration) {
    await promisify(this.instClient.SETEX)
      .bind(this.instClient)(key, duration, value);
  }

  async del(key) {
    await promisify(this.instClient.DEL).bind(this.instClient)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
