import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Role } from 'src/app/role/entities/role.entity';
import { GenderType } from 'src/common/enums/gender.enum';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findRoleId(id: string): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async registerUser(users: Users): Promise<Users> {
    return this.usersRepository.save(users);
  }

  async findUserByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roleId'],
    });
  }

  async loginUser(users: Users): Promise<Users> {
    return this.usersRepository.save(users);
  }

  async findByRoleId(id: string): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async findByIdWithRole(id: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roleId'],
    });
  }

  async findAllUser(skip: number, take: number): Promise<Users[]> {
    return this.usersRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['roleId'],
      skip,
      take,
    });
  }

  async countUsers(): Promise<number> {
    return this.usersRepository.count();
  }

  async findUser(id: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roleId'],
    });
  }

  async save(users: Users): Promise<Users> {
    return this.usersRepository.save(users);
  }

  async countFilteredUsers(
    full_name: string,
    email: string,
    role_name: string,
    employee_number: string,
    gender: GenderType,
  ): Promise<number> {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roleId', 'role');

    if (full_name) {
      query.andWhere('user.full_name LIKE :full_name', {
        full_name: `%${full_name}%`,
      });
    }

    if (email) {
      query.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }

    if (role_name) {
      query.andWhere('role.role_name LIKE :role_name', {
        role_name: `%${role_name}%`,
      });
    }

    if (employee_number) {
      query.andWhere('user.employee_number LIKE :employee_number', {
        employee_number: `%${employee_number}%`,
      });
    }

    if (gender) {
      query.andWhere('user.gender LIKE :gender', {
        gender: `%${gender}%`,
      });
    }

    return query.getCount();
  }

  async searchUsers(
    skip: number,
    take: number,
    full_name: string,
    email: string,
    role_name: string,
    employee_number: string,
    gender: GenderType,
    orderBy: string = 'user.createdAt',
    orderDirection: 'ASC' | 'DESC' = 'DESC',
  ): Promise<Users[]> {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roleId', 'role')
      .skip(skip)
      .take(take)
      .orderBy(orderBy, orderDirection);

    if (full_name) {
      query.where('user.full_name LIKE :full_name', {
        full_name: `%${full_name}%`,
      });
    }

    if (email) {
      query.where('user.email LIKE :email', { email: `%${email}%` });
    }

    if (role_name) {
      query.where('role.role_name LIKE :role_name', {
        role_name: `%${role_name}%`,
      });
    }

    if (employee_number) {
      query.where('role.employee_number LIKE :employee_number', {
        employee_number: `%${employee_number}%`,
      });
    }

    if (gender) {
      query.where('user.gender LIKE :gender', {
        gender: `%${gender}%`,
      });
    }

    return query.getMany();
  }

  async findById(id: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roleId'],
    });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async findByFullName(full_name: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: { full_name },
    });
  }

  async updateProfile(
    userId: string,
    full_name: string,
    birthday_date: Date,
    place_of_birth: string,
    phone_number: string,
    gender: GenderType,
    address: string,
    photo: string,
  ) {
    await this.usersRepository.update(userId, {
      full_name,
      birthday_date,
      place_of_birth,
      phone_number,
      gender,
      address,
      photo,
    });

    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roleId'],
    });
  }
}
