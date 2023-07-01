"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    // Log only if level is less than (meaning more severe) or equal to this
    level: "info",
    // Use timestamp and printf to create a standard log format
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    // log on error
    transports: [
        new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
    ],
});
exports.default = logger;
