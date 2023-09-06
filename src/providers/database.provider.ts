import { Logger } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import Transaction from '../transactions/entities/transaction.entity.js';
import { User } from '../users/entities/user.entity.js';
import { DEV_DB, IS_PROD, PROD_DB } from '../constants.js';

const logger = new Logger('Sequelize');

const logSql = (sql: string) => {
  logger.debug(sql);
};

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let sequelize: Sequelize;
      if (IS_PROD) {
        sequelize = new Sequelize(
          PROD_DB[0] as string,
          PROD_DB[1] as SequelizeOptions,
        );
      } else {
        sequelize = new Sequelize(DEV_DB);
      }

      sequelize.addModels([User, Transaction]);
      sequelize.options.logging = logSql;
      await sequelize.sync();
      return sequelize;
    },
  },
];
