import dotenv from 'dotenv';
dotenv.config();

import { connectToMongo } from './config/db';
import { logger } from './common/logger';
import app from './app';

const startServer = async (): Promise<void> => {
    try {
        await connectToMongo();
        const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
        app.listen(PORT, () => logger.info(`Server running on ${PORT}`))
    } catch (error) {
        logger.error(`Server failed to start - ${error}`);
        process.exit(1)
    }

};

startServer();
