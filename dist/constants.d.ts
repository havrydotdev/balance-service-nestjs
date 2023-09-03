declare const jwtSecret: string;
declare const pg: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};
declare const EXCHANGES_API_KEY: string;
declare const USERS_REPOSITORY = "USERS_REPOSITORY";
declare const TRANSACTIONS_REPOSITORY = "TRANSACTIONS_REPOSITORY";
export { jwtSecret, pg, USERS_REPOSITORY, TRANSACTIONS_REPOSITORY, EXCHANGES_API_KEY, };
