const redis = require('redis');

export const client = redis.createClient(process.env.REDIS_PORT);
