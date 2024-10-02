import { Role } from 'src/app/role/entities/role.entity';
import { Users } from '../entities/users.entity';

export interface IUsersRepository {
  findEmail(email: string): Promise<Users | undefined>;
  findRoleId(id: string): Promise<Role | undefined>;
  registerUser(users: Users): Promise<Users>;
  findUserByEmail(email: string): Promise<Users | undefined>;
  loginUser(users: Users): Promise<Users>;
}
