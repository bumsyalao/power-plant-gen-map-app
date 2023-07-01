const redis = require('redis');

// Redis configuration


const redisClient = redis.createClient({
    socket: {
        host: 'redis-15522.c91.us-east-1-3.ec2.cloud.redislabs.com',
        port: 15522
    }
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

redisClient.on('error', (error) => {
    console.error('Redis connection error:', error);
});

module.exports = redisClient;
