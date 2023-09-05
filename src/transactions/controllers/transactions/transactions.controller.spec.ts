/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from '../../../transactions/services/transactions/transactions.service';
import { transactionsRepository } from '../../../transactions/repository/transactions.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UsersService } from '../../../users/services/users/users.service';
import { usersRepository } from '../../../users/repository/users.repository';
import { Sequelize } from 'sequelize';
import createMemDb from '../../../utils/mem-db';
import Transaction from '../../../transactions/entities/transaction.entity';
import { genDebitDesc, genTopUpDesc } from '../../../utils/transaction-desc';
import { FastifyRequest } from 'fastify';
import { User } from '../../../users/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import getError from '../../../utils/get-error';

describe('TransactionsController', () => {
  let memDb: Sequelize;
  let controller: TransactionsController;
  let usersService: UsersService;
  let transactionsService: TransactionsService;

  const mockRequest = {
    user: {
      id: 1,
      email: 'example@gmail.com',
      name: 'Wade Allen',
    },
  } as unknown as FastifyRequest;

  beforeEach(async () => {
    memDb = await createMemDb();
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        transactionsRepository,
        UsersService,
        usersRepository,
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);

    usersService = module.get<UsersService>(UsersService);

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('CreateTopUp - OK', async () => {
    jest.spyOn(transactionsService, 'create').mockImplementationOnce(
      async () =>
        new Transaction({
          id: 1,
          userId: 1,
          type: 'top-up',
          desc: genTopUpDesc(300),
          value: 300,
        }),
    );

    const res = await controller.createTopUp(mockRequest, {
      value: 300,
    });

    expect(res).not.toBeNull();
    expect(res).toStrictEqual(
      new Transaction({
        id: 1,
        userId: 1,
        type: 'top-up',
        desc: genTopUpDesc(300),
        value: 300,
      }),
    );
  });

  it('CreateDebit - OK', async () => {
    jest.spyOn(transactionsService, 'create').mockImplementationOnce(
      async () =>
        new Transaction({
          id: 1,
          userId: 1,
          type: 'top-up',
          desc: genDebitDesc(300),
          value: -300,
        }),
    );

    const res = await controller.createDebit(mockRequest, {
      value: 300,
    });

    expect(res).not.toBeNull();
    expect(res).toStrictEqual(
      new Transaction({
        id: 1,
        userId: 1,
        type: 'top-up',
        desc: genDebitDesc(300),
        value: -300,
      }),
    );
  });

  it('CreateTransfer - OK', async () => {
    jest.spyOn(usersService, 'findById').mockImplementation(
      async (userId: number) =>
        new User({
          id: userId,
          email: 'example@gmail.com',
          name: 'Wade Allen',
          balance: 0,
        }),
    );

    jest.spyOn(transactionsService, 'create').mockImplementation(
      async () =>
        new Transaction({
          id: 1,
          userId: 1,
          type: 'top-up',
          desc: genDebitDesc(300),
          value: -300,
        }),
    );

    const res = await controller.createTransfer(mockRequest, {
      value: 300,
      toId: 2,
    });

    expect(usersService.findById).toHaveBeenCalledTimes(2);
    expect(transactionsService.create).toHaveBeenCalledTimes(2);
    expect(res).not.toBeNull();
    expect(res).toStrictEqual(
      new Transaction({
        id: 1,
        userId: 1,
        type: 'top-up',
        desc: genDebitDesc(300),
        value: -300,
      }),
    );
  });

  it('CreateTransfer - OK', async () => {
    jest.spyOn(usersService, 'findById').mockImplementation(async () => null);

    jest
      .spyOn(transactionsService, 'create')
      .mockImplementation(async () => null);

    const res = await getError<BadRequestException>(
      async () =>
        await controller.createTransfer(mockRequest, {
          value: 300,
          toId: 3,
        }),
    );

    expect(usersService.findById).toHaveBeenCalledTimes(2);
    expect(transactionsService.create).not.toHaveBeenCalled();
    expect(res).not.toBeNull();
    expect(res).toBeInstanceOf(BadRequestException);
    expect(res).toHaveProperty('message', 'Receiver does not exist');
  });

  it('GetAllByUser - OK', async () => {
    jest
      .spyOn(transactionsService, 'findAllByUser')
      .mockImplementationOnce(async () => [
        new Transaction({ id: 1, desc: 'desc1', value: -300, userId: 1 }),
        new Transaction({ id: 2, desc: 'desc2', value: 300, userId: 1 }),
        new Transaction({ id: 3, desc: 'desc3', value: 500, userId: 1 }),
      ]);

    const res = await controller.getAllByUser(mockRequest, undefined);

    expect(res).not.toBeNull();
    expect(transactionsService.findAllByUser).toHaveBeenCalled();
    expect(res).toHaveLength(3);
    expect(res).toStrictEqual([
      new Transaction({ id: 1, desc: 'desc1', value: -300, userId: 1 }),
      new Transaction({ id: 2, desc: 'desc2', value: 300, userId: 1 }),
      new Transaction({ id: 3, desc: 'desc3', value: 500, userId: 1 }),
    ]);
  });

  it('GetAllByUser - OK in UAH', async () => {
    jest
      .spyOn(transactionsService, 'findAllByUser')
      .mockImplementationOnce(async () => [
        new Transaction({ id: 1, desc: 'desc1', value: -300, userId: 1 }),
        new Transaction({ id: 2, desc: 'desc2', value: 300, userId: 1 }),
        new Transaction({ id: 3, desc: 'desc3', value: 500, userId: 1 }),
      ]);

    jest
      .spyOn(transactionsService, 'getRates')
      .mockImplementationOnce(async () => 8);

    const res = await controller.getAllByUser(mockRequest, 'UAH');

    expect(res).not.toBeNull();
    expect(transactionsService.findAllByUser).toHaveBeenCalled();
    expect(res).toHaveLength(3);
    expect(res[0]).toHaveProperty('value', -2400);
    expect(res[1]).toHaveProperty('value', 2400);
    expect(res[2]).toHaveProperty('value', 4000);
  });

  it('GetById - OK', async () => {
    jest
      .spyOn(transactionsService, 'findById')
      .mockImplementationOnce(
        async () =>
          new Transaction({ id: 1, desc: 'desc1', value: -300, userId: 1 }),
      );

    jest
      .spyOn(transactionsService, 'getRates')
      .mockImplementationOnce(async () => 8);

    const res = await controller.getById(mockRequest, 1, 'UAH');

    expect(res).not.toBeNull();
    expect(transactionsService.findById).toHaveBeenCalled();
    expect(res).toHaveProperty('value', -2400);
  });
});
