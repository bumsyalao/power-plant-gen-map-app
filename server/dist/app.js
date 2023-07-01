"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
const getPlantController_1 = require("./contollers/getPlantController");
const throng = require('throng');
const port = process.env.PORT || 8000;
const WORKERS = process.env.WEB_CONCURRENCY || 1;
function worker() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json({ limit: "1mb" }));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
        res.status(200).send("Welcome to Power Plant Gen Map API!");
    });
    app.use('/api', routes_1.default);
    app.use((req, res, next) => {
        // Log an info message for each incoming request
        logger_1.default.info('info', `Received a ${req.method} request for ${req.url}`);
        next();
    });
    // Start the server
    app.listen(port, () => {
        logger_1.default.log("info", `Server is running on port ${port}!`);
        // getPlantController_1.cronJob.start();
    });
}
throng({
    workers: Number(WORKERS),
    lifetime: Infinity,
    start: worker
});
