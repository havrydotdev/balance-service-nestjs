import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import Transaction from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';

const logger = new Logger('Sequelize');

const logSql = (sql: string) => {
  logger.debug(sql);
};

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        host: './dev.sqlite',
      });
      sequelize.addModels([User, Transaction]);
      sequelize.options.logging = logSql;
      await sequelize.sync();
      return sequelize;
    },
  },
];
