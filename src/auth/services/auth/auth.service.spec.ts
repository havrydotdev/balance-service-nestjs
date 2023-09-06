import { AuthService } from './auth.service';
import { User } from '../../..//users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../users/services/users/users.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { encodePassword } from '../../..//utils/bcrypt';
import getError from '../../..//utils/get-error';
import { Test } from '@nestjs/testing';
import { usersRepository } from '../../../users/repository/users.repository';
import { Sequelize } from 'sequelize';
import createMemDb from '../../../utils/mem-db';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let memDb: Sequelize;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, usersRepository],
    }).compile();

    jwtService = moduleRef.get<JwtService>(JwtService);

    usersService = moduleRef.get<UsersService>(UsersService);

    memDb = await createMemDb();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Login - OK', async () => {
    jest.spyOn(service, 'validateUser').mockImplementationOnce(async () => ({
      id: 1,
      email: 'example@gmail.com',
      name: 'Wade Allen',
    }));

    jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => 'access_token');

    const res = await service.login({
      email: 'example@gmail.com',
      password: 'anypass',
    });

    expect(res).not.toBeNull();
    expect(res).toStrictEqual({
      access_token: 'access_token',
    });
  });

  it('Login - Invalid Credentials', async () => {
    jest
      .spyOn(service, 'validateUser')
      .mockImplementationOnce(async () => null);

    const error = await getError<UnauthorizedException>(
      async () =>
        await service.login({
          email: 'example@gmail.com',
          password: 'anypass',
        }),
    );

    expect(error).toBeInstanceOf(UnauthorizedException);
    expect(error).toHaveProperty('message', 'Incorrect credentials');
  });

  it('ValidateUser - OK ', async () => {
    jest.spyOn(usersService, 'findOne').mockImplementationOnce(
      async () =>
        new User({
          id: 1,
          email: 'example@gmail.com',
          name: 'Wade Allen',
          password: encodePassword('12345'),
        }),
    );

    const res = await service.validateUser({
      email: 'example@gmail.com',
      password: '12345',
    });

    expect(res).not.toBeNull();
    expect(res).toStrictEqual({
      id: 1,
      name: 'Wade Allen',
      email: 'example@gmail.com',
    });
  });

  it('ValidateUser - Incorrect Password', async () => {
    jest.spyOn(usersService, 'findOne').mockImplementationOnce(
      async () =>
        new User({
          id: 1,
          email: 'example@gmail.com',
          name: 'Wade Allen',
          password: encodePassword('12345'),
        }),
    );

    const res = await service.validateUser({
      email: 'example@gmail.com',
      password: 'incorrect_password',
    });

    expect(res).toBeNull();
  });

  it('ValidateUser - User Not Found', async () => {
    jest
      .spyOn(usersService, 'findOne')
      .mockImplementationOnce(async () => null);

    const res = await service.validateUser({
      email: 'example@gmail.com',
      password: 'password',
    });

    expect(res).toBeNull();
  });

  it('Register - OK', async () => {
    jest.spyOn(usersService, 'findOne').mockImplementation(async () => null);
    jest.spyOn(usersService, 'create').mockImplementationOnce(async () => 1);

    const res = await service.register({
      email: 'example@gmail.com',
      name: 'Wade Allen',
      password: '12345',
    });

    expect(res).not.toBeNull();
    expect(res).toBe(1);
  });

  it('Register - User Exist', async () => {
    jest
      .spyOn(usersService, 'findOne')
      .mockImplementation(async () => new User({ id: 1 }));
    jest.spyOn(usersService, 'create').mockImplementationOnce(async () => 1);

    const res = await getError<BadRequestException>(
      async () =>
        await service.register({
          email: 'example@gmail.com',
          name: 'Wade Allen',
          password: '12345',
        }),
    );

    expect(res).not.toBeNull();
    expect(res).toBeInstanceOf(BadRequestException);
    expect(res).toHaveProperty(
      'message',
      'User with this email does already exist',
    );
  });
});
