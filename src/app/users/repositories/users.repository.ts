import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Role } from 'src/app/role/entities/role.entity';

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
}
