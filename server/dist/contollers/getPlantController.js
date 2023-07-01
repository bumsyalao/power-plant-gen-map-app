"use strict";
// @ts-nocheck 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronJob = exports.getPlantData = void 0;
const parseExcelFile_1 = require("../utils/parseExcelFile");
const util_1 = require("util");
const logger_1 = __importDefault(require("../utils/logger"));
const db_1 = require("../config/db");
const node_cron_1 = __importDefault(require("node-cron"));
const redisGetAsync = (0, util_1.promisify)(db_1.redisClient.get).bind(db_1.redisClient);
const redisSetAsync = (0, util_1.promisify)(db_1.redisClient.set).bind(db_1.redisClient);
const redisKey = 'plantData';
const getPlantData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if data is cached in Redis
        const cachedData = yield redisGetAsync(redisKey);
        if (cachedData) {
            // Return cached data
            const plantData = JSON.parse(cachedData);
            return res.status(200).json(plantData);
        }
        const plantData = (0, parseExcelFile_1.parseExcelFile)();
        // Store the data in Redis cache
        yield redisSetAsync(redisKey, JSON.stringify(plantData));
        // Return the data to the client
        return res.status(200).json(plantData);
    }
    catch (error) {
        logger_1.default.log('error', 'Error occurred while fetching plant data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        // Close Redis connection to avoid memory leaks
        yield (0, db_1.closeRedisConnection)();
    }
});
exports.getPlantData = getPlantData;
// exports.cronJob = node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
//     try {
//         const excelData = (0, parseExcelFile_1.parseExcelFile)();
//         yield redisSetAsync(redisKey, JSON.stringify(excelData));
//         logger_1.default.info('info', 'Excel data cached successfully');
//     }
//     catch (error) {
//         logger_1.default.error('error', 'Error caching Excel data:', error);
//     }
//     finally {
//         // Close Redis connection to avoid memory leaks
//         yield (0, db_1.closeRedisConnection)();
//     }
// }));
