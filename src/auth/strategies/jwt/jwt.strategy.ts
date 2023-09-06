import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../../..//constants.js';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import SignUserDto from 'src/auth/dto/sign-user.dto.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { decodeJwt } = require('../../../../index.node');

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException({
        message: 'Invalid jwt token',
      });
    }

    return { id: payload.id, email: payload.email, name: payload.name };
  }

  async authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: any,
  ): Promise<void> {
    const splittedHeader = req.headers.authorization.split(' ');
    if (splittedHeader.length !== 2 || splittedHeader[0] !== 'Bearer') {
      console.log('error');
      this.fail(
        {
          message: 'Invalid Bearer Token!',
        },
        401,
      );
    }

    const user: SignUserDto = decodeJwt(splittedHeader[1]);
    if (!user || !user.email || !user.id || !user.name) {
      this.fail(
        {
          message: 'Invalid Bearer Token!',
        },
        401,
      );
    }
    this.success(user);
  }
}
