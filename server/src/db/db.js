import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath  } from 'url';
import { config } from 'dotenv';

const dir = dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(dir, '../../.env') })

dotenv.config();

console.log(process.env.DB_USER);

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

export default sequelize;
