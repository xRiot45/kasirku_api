import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RoleType } from 'src/common/enums/role.enum';
import { Logger } from 'winston';
import { RoleRequestDto, RoleResponseDto } from './dtos/dto';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(
    @Inject('IRoleRepository')
    private readonly roleRepository: RoleRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async createRoleService(
    request: RoleRequestDto,
  ): Promise<IBaseResponse<RoleResponseDto>> {
    const { role_name } = request;

    try {
      const roleExist = await this.roleRepository.findByRoleName(role_name);
      if (roleExist) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'Conflict',
            message: 'Role already exist',
          },
          HttpStatus.CONFLICT,
        );
      }

      const payload = { role_name };
      const role = new Role(payload);
      const createRole = await this.roleRepository.create(role);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Role created successfully',
        data: {
          id: createRole.id,
          role_name: createRole.role_name,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error creating role: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error creating role: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllRoleService(
    page: number = 1,
    limit: number = 1,
    role_name: RoleType,
  ): Promise<IBaseResponse<RoleResponseDto[]>> {
    try {
      const skip = (page - 1) * limit;
      const totalRoles = await this.roleRepository.countFilteredRole(role_name);

      const totalPages = Math.ceil(totalRoles / limit);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;

      const roles = await this.roleRepository.searchRole(
        skip,
        limit,
        role_name,
      );

      const result: RoleResponseDto[] = roles.map((role) => ({
        id: role.id,
        role_name: role.role_name,
      }));

      return {
        statusCode: HttpStatus.OK,
        message: 'Search role successfully',
        data: result,
        totalItems: totalRoles,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error searching role: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error searching role: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findRoleByIdService(
    id: string,
  ): Promise<IBaseResponse<RoleResponseDto>> {
    try {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Role not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Find role by id successfully',
        data: {
          id: role.id,
          role_name: role.role_name,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find role by id: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find find role by id: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRoleService(
    roleId: string,
    request: RoleRequestDto,
  ): Promise<IBaseResponse<RoleResponseDto>> {
    const { role_name } = request;

    try {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Role not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const roleExist = await this.roleRepository.findByRoleName(role_name);
      if (roleExist && roleExist.id !== roleId) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'Conflict',
            message: 'Role already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      await this.roleRepository.updateRole(roleId, { role_name });
      const updatedRole = await this.roleRepository.findById(roleId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Role updated successfully',
        data: {
          id: updatedRole.id,
          role_name: updatedRole.role_name,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error Updated role: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error Updated role: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteRoleService(roleId: string): Promise<WebResponse> {
    try {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Role not found or already deleted',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.roleRepository.deleteRole(roleId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Role deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error deleting role: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error deleting role: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
