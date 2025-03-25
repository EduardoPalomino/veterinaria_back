import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_DOMAIN, DB_PORT, DB,DB_USER,DB_PASSWORD } = process.env;

//const mongoUri: string = `mongodb://${DB_DOMAIN}:${DB_PORT}/${DB}`;
const mongoUri: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_DOMAIN}/${DB}?retryWrites=true&w=majority`;

const cnBD = async (): Promise<void> => {
    await mongoose.connect(mongoUri);
};

export default cnBD;


