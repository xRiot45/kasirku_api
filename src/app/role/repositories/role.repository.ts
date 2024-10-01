import { Injectable } from '@nestjs/common';
import { IRoleRepository } from '../interfaces/role.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { RoleType } from 'src/common/enums/role.enum';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(data: Role): Promise<Role> {
    return this.roleRepository.save(data);
  }

  async findByRoleName(roleName: RoleType): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { role_name: roleName } });
  }

  async findAllRole(skip: number, take: number): Promise<Role[]> {
    return this.roleRepository.find({
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
  }

  async countRoles(): Promise<number> {
    return this.roleRepository.count();
  }

  async findById(id: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async searchRole(roleName: RoleType): Promise<Role> {
    return this.roleRepository.findOne({ where: { role_name: roleName } });
  }

  async updateRole(id: string, data: Partial<Role>): Promise<void> {
    await this.roleRepository.update(id, data);
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
