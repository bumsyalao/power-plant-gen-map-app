// @ts-nocheck 
import { Request, Response } from 'express';
import { parseExcelFile } from '../utils/parseExcelFile';
import { promisify } from 'util';
import logger from '../utils/logger';
import redisClient from '../config/db';
import cron from 'node-cron';

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);
const redisKey = 'plantData';



export const getPlantData = async (req: Request, res: Response) => {

    try {
        // Check if data is cached in Redis
        const cachedData = await redisGetAsync(redisKey);

        if (cachedData) {
            // Return cached data
            const plantData = JSON.parse(cachedData);
            return res.status(200).json(plantData);
        }

        const plantData = parseExcelFile();

        // Store the data in Redis cache
        await redisSetAsync(redisKey, JSON.stringify(plantData));

        // Return the data to the client
        return res.status(200).json(plantData);

    } catch (error) {
        logger.log('error', 'Error occurred while fetching plant data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const cronJob = cron.schedule('* * * * *', async () => {
    try {
        const excelData = parseExcelFile();

        await redisSetAsync(redisKey, JSON.stringify(excelData));
        logger.info('info', 'Excel data cached successfully');
    } catch (error) {
        logger.error('error', 'Error caching Excel data:', error);
    }
});