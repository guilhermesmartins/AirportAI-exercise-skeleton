import { getLogger } from 'log4js';
import mongoose from 'mongoose';

const logger = getLogger('database');

mongoose.set('debug', process.env.NODE_ENV !== 'prod');

mongoose
  .connect(process.env.DATABASE_URL as string, {
    useUnifiedTopology: true,
  })
  .then(() => logger.info('Database is connected'));
