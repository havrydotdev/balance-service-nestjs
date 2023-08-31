import { USERS_REPOSITORY } from 'src/constants';
import { User } from '../entities/user.entity';

export const usersRepository = {
  provide: USERS_REPOSITORY,
  useValue: User,
};
