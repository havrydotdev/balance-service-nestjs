import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import Transaction from '../transactions/entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { PG } from 'src/constants';
import pg from 'pg';

const logger = new Logger('Sequelize');

const logSql = (sql: string) => {
  logger.debug(sql);
};

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(PG.URL, {
        dialectModule: pg,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([User, Transaction]);
      sequelize.options.logging = logSql;
      await sequelize.sync();
      return sequelize;
    },
  },
];
