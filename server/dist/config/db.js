const redis = require('redis');
const db_port = process.env.DB_PORT || 15522;

// Redis configuration
const redisClient = redis.createClient({
    password: 'CjwIRLKGWbitOlDjvqwYXafukswJa1rB',
    host: 'redis-15522.c91.us-east-1-3.ec2.cloud.redislabs.com',
    port: db_port
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

redisClient.on('error', (error) => {
    console.error('Redis connection error:', error);
});

// Function to close the Redis connection gracefully
function closeRedisConnection() {
    return new Promise((resolve, reject) => {
        redisClient.quit((err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Redis connection closed');
                resolve();
            }
        });
    });
}

// Export the Redis client and closeRedisConnection function
module.exports = { redisClient, closeRedisConnection };
