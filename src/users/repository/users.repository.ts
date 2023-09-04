import { USERS_REPOSITORY } from '../../constants';
import { User } from '../entities/user.entity';

export const usersRepository = {
  provide: USERS_REPOSITORY,
  useValue: User,
};
