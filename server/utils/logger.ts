import winston from "winston";

const logger = winston.createLogger({
    // Log only if level is less than (meaning more severe) or equal to this
    level: "info",
    // Use timestamp and printf to create a standard log format
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            (info: any) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    // log on error
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],

});


export default logger;