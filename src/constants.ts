import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });

const jwtSecret = process.env.JWT_SECRET;

const PG = {
  HOST: process.env.POSTGRES_HOST,
  PORT: parseInt(process.env.POSTGRES_PORT),
  USERNAME: process.env.POSTGRES_USER,
  PASWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DATABASE,
  URL: process.env.POSTGRES_URL,
};

const EXCHANGES_API_KEY = process.env.EXCHANGES_API_KEY;

const USERS_REPOSITORY = 'USERS_REPOSITORY';

const TRANSACTIONS_REPOSITORY = 'TRANSACTIONS_REPOSITORY';

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

export {
  jwtSecret,
  PG,
  USERS_REPOSITORY,
  TRANSACTIONS_REPOSITORY,
  EXCHANGES_API_KEY,
  CSS_URL,
};
