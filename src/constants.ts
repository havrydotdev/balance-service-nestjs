import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });

const jwtSecret = process.env.JWT_SECRET;

const pg = {
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
};

const USERS_REPOSITORY = 'USERS_REPOSITORY';

const TRANSACTIONS_REPOSITORY = 'TRANSACTIONS_REPOSITORY';

export { jwtSecret, pg, USERS_REPOSITORY, TRANSACTIONS_REPOSITORY };
