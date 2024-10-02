import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { GetUserResponse } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async findAllUsers(
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
}
