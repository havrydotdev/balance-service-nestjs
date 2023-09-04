import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersRepository } from '../../../users/repository/users.repository';
import { User } from '../../../users/entities/user.entity';
import { USERS_REPOSITORY } from '../../../constants';
import { Sequelize } from 'sequelize';
import createMemDb from '../../../utils/mem-db';

describe('UsersService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let memDb: Sequelize;
  let service: UsersService;
  let repo: typeof User;

  beforeEach(async () => {
    memDb = await createMemDb();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, usersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);

    repo = module.get<typeof User>(USERS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('FindOne - OK', async () => {
    jest.spyOn(repo, 'findOne').mockImplementationOnce(
      async () =>
        new User({
          id: 1,
          email: 'example@gmail.com',
          password: '12345',
          name: 'Wade Allen',
        }),
    );

    const res = await service.findOne('example@gmail.com');

    expect(res).not.toBeNull();
    expect(res).toStrictEqual(
      new User({
        id: 1,
        email: 'example@gmail.com',
        password: '12345',
        name: 'Wade Allen',
      }),
    );
  });

  it('FindById - OK', async () => {
    jest.spyOn(repo, 'findByPk').mockImplementationOnce(
      async () =>
        new User({
          id: 1,
          email: 'example@gmail.com',
          password: '12345',
          name: 'Wade Allen',
        }),
    );

    const res = await service.findById(1);

    expect(res).not.toBeNull();
    expect(res).toHaveProperty('password', null);
    expect(res).toHaveProperty('name', 'Wade Allen');
    expect(res).toHaveProperty('email', 'example@gmail.com');
    expect(res).toHaveProperty('id', 1);
  });

  it('UpdateBalance - OK', async () => {
    jest.spyOn(repo, 'increment').mockImplementationOnce(async () => [[], 1]);

    const res = await service.updateBalance(1, 300);

    expect(res).not.toBeNull();
    expect(res).toStrictEqual(1);
  });

  it('Create - OK', async () => {
    jest.spyOn(repo, 'create').mockImplementationOnce(
      async () =>
        new User({
          id: 1,
        }),
    );

    const res = await service.create({
      email: 'example@gmail.com',
      name: 'Wade Allen',
      password: '12345',
    });

    expect(res).not.toBeNull();
    expect(res).toBe(1);
  });
});
