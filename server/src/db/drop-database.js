import { config } from 'dotenv';
import pgtools from 'pgtools';

config();

const dbName = process.env.DB_NAME;

const pgConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
};

const dropDb = async () => {
  await pgtools.dropdb(pgConfig, dbName);
};

dropDb();
