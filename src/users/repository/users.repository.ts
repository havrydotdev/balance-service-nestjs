import { USERS_REPOSITORY } from '../../constants.js';
import { User } from '../entities/user.entity.js';

export const usersRepository = {
  provide: USERS_REPOSITORY,
  useValue: User,
};
