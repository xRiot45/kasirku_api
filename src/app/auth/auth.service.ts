import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dtos/auth.dto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../users/interfaces/users.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponseDto } from './dtos/auth.dto';
import { Users } from '../users/entities/users.entity';
import { generateEmployeeNumber } from 'src/common/utils/employeeNumber.util';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async registerUserService(
    request: RegisterRequestDto,
  ): Promise<IBaseResponse<RegisterResponseDto>> {
    const { email, full_name, roleId } = request;
    try {
      const emailExist = await this.usersRepository.findEmail(email);
      if (emailExist) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'Conflict',
            message: 'Email already registered',
          },
          HttpStatus.CONFLICT,
        );
      }

      const role = await this.usersRepository.findRoleId(roleId);
      if (!role) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Role Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const generatePassword = 'Karyawan#123';
      const hashedPassword = await bcrypt.hash(generatePassword, 12);
      const employeeNumber = generateEmployeeNumber();
      const payload = {
        email: email,
        full_name: full_name,
        password: hashedPassword,
        employee_number: employeeNumber,
        roleId: role,
      };

      const user = new Users(payload);
      const registerUser = await this.usersRepository.registerUser(user);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Register user successfully',
        data: {
          id: registerUser.id,
          email: registerUser.email,
          full_name: registerUser.full_name,
          employee_number: registerUser.employee_number,
          role: {
            id: registerUser?.roleId?.id,
            role_name: registerUser?.roleId?.role_name,
          },
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error register user: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error register user: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
