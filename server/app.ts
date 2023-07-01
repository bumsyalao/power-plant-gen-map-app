import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import routes from './routes';
import { cronJob } from './contollers/getPlantController';

const throng = require('throng')
const port = process.env.PORT || 8000;
const WORKERS = process.env.WEB_CONCURRENCY || 1;

function worker() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json({ limit: "1mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("Welcome to Power Plant Gen Map API!");
    });

    app.use('/api', routes);

    app.use((req, res, next) => {
        // Log an info message for each incoming request
        logger.info('info', `Received a ${req.method} request for ${req.url}`);
        next();
    });

    // Start the server
    app.listen(port, () => {
        logger.log("info", `Server is running on port ${port}!`);
        cronJob.start();
    });
}

throng({
    workers: Number(WORKERS),
    lifetime: Infinity,
    start: worker
});
