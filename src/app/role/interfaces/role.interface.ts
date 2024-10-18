import { RoleType } from 'src/common/enums/role.enum';
import { Role } from '../entities/role.entity';

// Interface hanya mendefinisikan kontrak (metode dan properti), dan implementasinya dilakukan sepenuhnya di kelas yang mengimplementasikan interface tersebut.
export interface IRoleRepository {
  create(data: Role): Promise<Role>;
  findByRoleName(roleName: string): Promise<Role | undefined>;
  findAllRole(skip: number, take: number): Promise<Role[]>;
  countRoles(): Promise<number>;
  findById(id: string): Promise<Role>;
  updateRole(id: string, data: Partial<Role>): Promise<void>;
  deleteRole(id: string): Promise<void>;
  countFilteredRole(role_name: string): Promise<number>;
  searchRole(skip: number, take: number, role_name: RoleType): Promise<Role[]>;
}
