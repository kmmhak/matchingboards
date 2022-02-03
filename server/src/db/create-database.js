/* eslint-disable no-console */
import pg from 'pg';
import fs from 'fs';
import db from './db.js';

const { Client } = pg;

const databaseName = process.env.DB_NAME;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createDatabase = async () => {
  console.log(`Creating a database ${databaseName}...`);

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${databaseName}`);

    const sqlPath = new URL('database.sql', import.meta.url);
    const query = await fs.promises.readFile(sqlPath);
    await db.query(query.toString());

    console.log(`Created a database ${databaseName}`);
  } catch (error) {
    console.log(error.message);
  } finally {
    await client.end();
    await db.close();
  }
};

createDatabase();
