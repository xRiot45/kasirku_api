import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { DeleteUserRequestDto, GetUserResponse } from './dtos/users.dto';
import * as bcrypt from 'bcrypt';
import { GenderType } from 'src/common/enums/gender.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async findUserService(decodedTokenPayload: {
    id: string;
  }): Promise<IBaseResponse<GetUserResponse>> {
    try {
      const user = await this.usersRepository.findUser(decodedTokenPayload.id);
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User found successfully',
        data: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          employee_number: user.employee_number,
          birthday_date: user.birthday_date,
          place_of_birth: user.place_of_birth,
          phone_number: user.phone_number,
          gender: user.gender,
          address: user.address,
          photo: user.photo,
          role: {
            id: user?.roleId?.id,
            role_name: user?.roleId?.role_name,
          },
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find user: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find user: ${error}`);
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

  async findAllUsersService(
    page: number = 1,
    limit: number = 10,
  ): Promise<IBaseResponse<GetUserResponse[]>> {
    try {
      const skip = (page - 1) * limit;
      const users = await this.usersRepository.findAllUser(skip, limit);

      const totalUsers = await this.usersRepository.countUsers();
      const totalPages = Math.ceil(totalUsers / limit);

      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;

      return {
        statusCode: HttpStatus.OK,
        message: 'Find all users successfully',
        data: users.map((user) => ({
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          employee_number: user.employee_number,
          birthday_date: user.birthday_date,
          place_of_birth: user.place_of_birth,
          phone_number: user.phone_number,
          gender: user.gender,
          address: user.address,
          photo: user.photo,
          role: {
            id: user?.roleId?.id,
            role_name: user?.roleId?.role_name,
          },
        })),
        totalItems: totalUsers,
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
        this.logger.error(`Error find all user: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find all user: ${error}`);
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

  async findUserByIdService(
    id: string,
  ): Promise<IBaseResponse<GetUserResponse>> {
    try {
      const user = await this.usersRepository.findById(id);

      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Find user by ID successfully',
        data: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          employee_number: user.employee_number,
          birthday_date: user.birthday_date,
          place_of_birth: user.place_of_birth,
          phone_number: user.phone_number,
          gender: user.gender,
          address: user.address,
          photo: user.photo,
          role: {
            id: user?.roleId?.id,
            role_name: user?.roleId?.role_name,
          },
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find user by id: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find user by id: ${error}`);
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

  async searchUsersService(
    page: number = 1,
    limit: number = 1,
    full_name: string,
    email: string,
    role_name: string,
    employee_number: string,
    gender: GenderType,
  ): Promise<IBaseResponse<GetUserResponse[]>> {
    try {
      const skip = (page - 1) * limit;
      const totalUsers = await this.usersRepository.countFilteredUsers(
        full_name,
        email,
        role_name,
        employee_number,
        gender,
      );

      const totalPages = Math.ceil(totalUsers / limit);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;

      const users = await this.usersRepository.searchUsers(
        skip,
        limit,
        full_name,
        email,
        role_name,
        employee_number,
        gender,
      );

      if (users.length === 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Users not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const result: GetUserResponse[] = users.map((user) => ({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        employee_number: user.employee_number,
        birthday_date: user.birthday_date,
        place_of_birth: user.place_of_birth,
        phone_number: user.phone_number,
        gender: user.gender,
        address: user.address,
        photo: user.photo,
        role: {
          id: user?.roleId?.id,
          role_name: user?.roleId?.role_name,
        },
      }));

      return {
        statusCode: HttpStatus.OK,
        message: 'Search users successfully',
        data: result,
        totalItems: totalUsers,
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
        this.logger.error(`Error search users: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error search users: ${error}`);
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

  async resetPasswordService(id: string): Promise<WebResponse> {
    try {
      const user = await this.usersRepository.findByIdWithRole(id);
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const roleName = user.roleId.role_name;
      const resetPassword = await bcrypt.hash(`${roleName}#123`, 12);
      user.password = resetPassword;

      await this.usersRepository.save(user);
      return {
        statusCode: HttpStatus.OK,
        message: 'Reset password successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error occurred: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error occurred: ${error}`);
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

  async deleteUser(
    id: string,
    request: DeleteUserRequestDto,
  ): Promise<WebResponse> {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        user.email !== request.email ||
        user.employee_number !== request.employee_number
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Invalid Data',
            message: 'Email or Employee number is incorrect',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const isPasswordValid = await bcrypt.compare(
        request.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Invalid Password',
            message: 'Password is incorrect',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.usersRepository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error delete user: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error delete user: ${error}`);
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
