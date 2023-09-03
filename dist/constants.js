"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCHANGES_API_KEY = exports.TRANSACTIONS_REPOSITORY = exports.USERS_REPOSITORY = exports.pg = exports.jwtSecret = void 0;
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '../.env') });
const jwtSecret = process.env.JWT_SECRET;
exports.jwtSecret = jwtSecret;
const pg = {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
};
exports.pg = pg;
const EXCHANGES_API_KEY = process.env.EXCHANGES_API_KEY;
exports.EXCHANGES_API_KEY = EXCHANGES_API_KEY;
const USERS_REPOSITORY = 'USERS_REPOSITORY';
exports.USERS_REPOSITORY = USERS_REPOSITORY;
const TRANSACTIONS_REPOSITORY = 'TRANSACTIONS_REPOSITORY';
exports.TRANSACTIONS_REPOSITORY = TRANSACTIONS_REPOSITORY;
//# sourceMappingURL=constants.js.map