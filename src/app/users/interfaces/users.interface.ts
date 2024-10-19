import { Role } from 'src/app/role/entities/role.entity';
import { GenderType } from 'src/common/enums/gender.enum';
import { DeleteResult } from 'typeorm';
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
  countFilteredUsers(
    full_name: string,
    email: string,
    role_name: string,
    employee_number: string,
    gender: GenderType,
  ): Promise<number>;
  searchUsers(
    skip: number,
    take: number,
    full_name: string,
    email: string,
    role_name: string,
    employee_number: string,
    gender: GenderType,
  ): Promise<Users[]>;
  findById(id: string): Promise<Users>;
  delete(id: string): Promise<DeleteResult>;
  findByFullName(full_name: string): Promise<Users>;
  updateProfile(
    userId: string,
    full_name: string,
    birthday_date: Date,
    place_of_birth: string,
    phone_number: string,
    gender: GenderType,
    address: string,
    photo: string,
  ): Promise<any>;

  updateProfileByAdmin(
    id: string,
    full_name: string,
    birthday_date: Date,
    place_of_birth: string,
    phone_number: string,
    gender: GenderType,
    address: string,
    photo: string,
    roleId: string,
  ): Promise<any>;
}
