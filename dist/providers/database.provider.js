"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const transaction_entity_1 = require("../transactions/entities/transaction.entity");
const user_entity_1 = require("../users/entities/user.entity");
const logger = new common_1.Logger('Sequelize');
const logSql = (sql) => {
    logger.debug(sql);
};
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'sqlite',
                host: './dev.sqlite',
            });
            sequelize.addModels([user_entity_1.User, transaction_entity_1.default]);
            sequelize.options.logging = logSql;
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.provider.js.map