import express, { type Application } from 'express';
import cors from 'cors';
import { logger } from './common/logger';

import healthRoutes from './routes/health.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const startTime = Date.now();
    logger.info(`START -> ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
        const durationMs = Date.now() - startTime;
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 400) {
            logger.info(`END -> ${req.method} ${req.originalUrl} (${statusCode}) in ${durationMs}ms`);
        } else {
            logger.warn(`END -> ${req.method} ${req.originalUrl} (${statusCode}) in ${durationMs}ms`);
        }
    })
    next();
})

app.use('/api/health', healthRoutes);

export default app;