import { config } from 'dotenv';

config();

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
