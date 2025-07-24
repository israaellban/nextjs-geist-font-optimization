import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redis = new Redis(redisUrl);

redis.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redis.on('error', (error) => {
  console.error('❌ Redis connection error:', error);
});
