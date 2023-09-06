import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/entities/user.entity.js';
import Transaction from '../transactions/entities/transaction.entity.js';

const createMemDb = async (): Promise<Sequelize> => {
  const memDb = new Sequelize({
    host: './test.sqlite',
    dialect: 'sqlite',
  });
  memDb.addModels([User, Transaction]);
  await memDb.sync({ force: true });

  return memDb;
};

export default createMemDb;
