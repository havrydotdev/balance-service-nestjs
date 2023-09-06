import * as dotenv from 'dotenv';
import { resolve } from 'path';
import pg from 'pg';

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

const CUSTOM_CSS = [
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui-standalone-preset.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui.css',
];

const CUSTOM_JS = [
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui-bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui-standalone-preset.min.js',
];

const PROD_DB = [
  PG.URL,
  {
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
];

const DEV_DB = {
  dialect: 'sqlite' as const,
  host: './dev.sqlite',
};

const IS_PROD = !!process.env.PROD;

export {
  jwtSecret,
  PG,
  USERS_REPOSITORY,
  TRANSACTIONS_REPOSITORY,
  EXCHANGES_API_KEY,
  CUSTOM_CSS,
  CUSTOM_JS,
  PROD_DB,
  DEV_DB,
  IS_PROD,
};