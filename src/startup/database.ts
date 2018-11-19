import * as mongoose from 'mongoose';
import * as winston from 'winston';

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true });
        // winston.info('MongoDB connection established');

    } catch (e) {

        winston.error(e.message, e);
    }
  
}