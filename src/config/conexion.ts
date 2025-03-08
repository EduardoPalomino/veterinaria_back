import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_DOMAIN, DB_PORT, DB } = process.env;

const mongoUri: string = `mongodb://${DB_DOMAIN}:${DB_PORT}/${DB}`;


const cnBD = async (): Promise<void> => {
    await mongoose.connect(mongoUri);
};

export default cnBD;


