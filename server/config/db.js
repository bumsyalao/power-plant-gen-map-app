const redis = require('redis');

// Redis configuration
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

redisClient.on('error', (error) => {
    console.error('Redis connection error:', error);
});

module.exports = redisClient;
