import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import Transaction from '../transactions/entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { PG } from 'src/constants';

const logger = new Logger('Sequelize');

const logSql = (sql: string) => {
  logger.debug(sql);
};

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: PG.HOST,
        port: PG.PORT,
        username: PG.USERNAME,
        password: PG.PASWORD,
        database: PG.DATABASE,
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
