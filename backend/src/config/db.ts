import mongoose from 'mongoose';
import { logger } from '../common/logger';

export const connectToMongo = async (): Promise<void> => {
    try {
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) {
            throw new Error(`MONGO_URI is not defined for THE environment`);
        }
        await mongoose.connect(MONGO_URI);
        logger.info('Connection to mongodb successfull')
    } catch (error) {
        logger.error(`Connection to mongodb failed - ${error}`)
    }

}