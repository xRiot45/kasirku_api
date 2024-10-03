import { Role } from 'src/app/role/entities/role.entity';
import { Users } from '../entities/users.entity';

export interface IUsersRepository {
  findEmail(email: string): Promise<Users | undefined>;
  findRoleId(id: string): Promise<Role | undefined>;
  registerUser(users: Users): Promise<Users>;
  findUserByEmail(email: string): Promise<Users | undefined>;
  loginUser(users: Users): Promise<Users>;
  findByRoleId(id: string): Promise<Role | undefined>;
  findByIdWithRole(id: string): Promise<Users | undefined>;
  findAllUser(skip: number, take: number): Promise<Users[]>;
  countUsers(): Promise<number>;
  findUser(id: string): Promise<Users | undefined>;
  save(users: Users): Promise<Users>;
}
