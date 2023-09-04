/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Sequelize } from 'sequelize';
import { TRANSACTIONS_REPOSITORY } from '../../../constants';
import createMemDb from '../../../utils/mem-db';
import { transactionsRepository } from '../../../transactions/repository/transactions.repository';
import { HttpModule } from '@nestjs/axios';
import Transaction from '../../../transactions/entities/transaction.entity';
import getError from '../../../utils/get-error';
import { UnauthorizedException } from '@nestjs/common';

describe('TransactionsService', () => {
  let memDb: Sequelize;
  let service: TransactionsService;
  let repo: typeof Transaction;

  beforeEach(async () => {
    memDb = await createMemDb();
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TransactionsService, transactionsRepository],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);

    repo = module.get<typeof Transaction>(TRANSACTIONS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('FindAll - OK', async () => {
    jest
      .spyOn(repo, 'findAll')
      .mockImplementationOnce(async () => [
        new Transaction({ id: 1 }),
        new Transaction({ id: 2 }),
        new Transaction({ id: 3 }),
      ]);

    const res = await service.findAllByUser(1);

    expect(res).not.toBeNull();
    expect(res).toHaveLength(3);
    expect(res).toStrictEqual([
      new Transaction({ id: 1 }),
      new Transaction({ id: 2 }),
      new Transaction({ id: 3 }),
    ]);
  });

  it('FindById - OK', async () => {
    jest.spyOn(repo, 'findByPk').mockImplementationOnce(
      async () =>
        new Transaction({
          id: 1,
          userId: 2,
        }),
    );

    const res = await service.findById(1, 2);

    expect(res).not.toBeNull();
    expect(res).toBeInstanceOf(Transaction);
    expect(res).toStrictEqual(
      new Transaction({
        id: 1,
        userId: 2,
      }),
    );
  });

  it('FindById - Not User`s Transaction', async () => {
    jest.spyOn(repo, 'findByPk').mockImplementationOnce(
      async () =>
        new Transaction({
          id: 1,
          userId: 1,
        }),
    );

    const res = await getError<UnauthorizedException>(
      async () => await service.findById(1, 2),
    );

    expect(res).not.toBeNull();
    expect(res).toBeInstanceOf(UnauthorizedException);
    expect(res).toHaveProperty(
      'message',
      'You don`t have access to this transaction',
    );
  });

  it('Create - OK', async () => {
    jest.spyOn(repo, 'create').mockImplementationOnce(
      async () =>
        new Transaction({
          id: 1,
          desc: 'Debit by purchase 300EUR',
          type: 'debit',
          userId: 1,
          value: 300,
        }),
    );

    const res = await service.create({
      desc: 'Debit by purchase 300EUR',
      type: 'debit',
      userId: 1,
      value: 300,
    });

    expect(res).not.toBeNull();
    expect(res).toBeInstanceOf(Transaction);
    expect(res).toStrictEqual(
      new Transaction({
        id: 1,
        desc: 'Debit by purchase 300EUR',
        type: 'debit',
        userId: 1,
        value: 300,
      }),
    );
  });
});
