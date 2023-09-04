/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from '../../..//auth/services/auth/auth.service';
import { AuthController } from './auth.controller';
import { Sequelize } from 'sequelize-typescript';
import { Test } from '@nestjs/testing';
import { UsersService } from '../../../users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { usersRepository } from '../../../users/repository/users.repository';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import getError from '../../../utils/get-error';
import { HTTPRequestPart, ValidationFunction } from 'fastify/types/request';

describe('AuthController', () => {
  let memDb: Sequelize;
  let authService: AuthService;
  let controller: AuthController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService, usersRepository],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    controller = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Login - OK', async () => {
    jest.spyOn(authService, 'login').mockImplementationOnce(async () => ({
      access_token: 'access_token',
    }));

    const res = await controller.login({
      email: 'example@gmail.com',
      password: '12345',
    });

    expect(res).not.toBeNull();
    expect(res).toHaveProperty('access_token', 'access_token');
  });

  it('Login - Invalid Credentials', async () => {
    jest.spyOn(authService, 'login').mockImplementationOnce(async () => {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
      });
    });

    const res = await getError<UnauthorizedException>(
      async () =>
        await controller.login({
          email: 'example@gmail.com',
          password: '12345',
        }),
    );

    expect(res).not.toBeNull();
    expect(res).toBeInstanceOf(UnauthorizedException);
    expect(res).toHaveProperty('message', 'Invalid credentials');
  });

  it('Register - OK', async () => {
    jest.spyOn(authService, 'register').mockImplementationOnce(async () => 1);

    const res = await controller.register({
      email: 'example@gmail.com',
      password: '12345',
      name: 'Wade Allen',
    });

    expect(res).not.toBeNull();
    expect(res).toHaveProperty('user_id', 1);
  });

  it('Register - Invalid Credentials', async () => {
    jest.spyOn(authService, 'register').mockImplementationOnce(async () => {
      throw new BadRequestException({
        message: 'User with this email does already exist',
      });
    });

    const res = await getError<UnauthorizedException>(
      async () =>
        await controller.register({
          email: 'example@gmail.com',
          password: '12345',
          name: 'Wade Allen',
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
