import * as bcrypt from 'bcrypt';
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenResponseDto,
  RegisterRequestDto,
} from './dtos/auth.dto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../users/interfaces/users.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponseDto } from './dtos/auth.dto';
import { Users } from '../users/entities/users.entity';
import { generateEmployeeNumber } from 'src/common/utils/employeeNumber.util';
import { Request, Response } from 'express';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from 'src/configs/environment.config';

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

      const generatePassword = 'Employee#123';
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

  async loginUserService(
    request: LoginRequestDto,
    response: Response,
  ): Promise<IBaseResponse<LoginResponseDto>> {
    const { email, password } = request;

    try {
      const user = await this.usersRepository.findUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          employee_number: user.employee_number,
          role: {
            id: user.roleId.id,
            role_name: user.roleId.role_name,
          },
        };

        const createAccessToken = this.jwtService.sign(payload, {
          secret: ACCESS_TOKEN_SECRET,
        });

        const createRefreshToken = this.jwtService.sign(payload, {
          secret: REFRESH_TOKEN_SECRET,
          expiresIn: 7 * 24 * 60 * 60 * 1000,
        });

        await this.usersRepository.loginUser(user);
        response.cookie('accessToken', createAccessToken, {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 60 * 60 * 1000,
        });

        response.cookie('refreshToken', createRefreshToken, {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
          statusCode: HttpStatus.CREATED,
          message: 'User logged in successfully',
          data: {
            access_token: createAccessToken,
            refresh_token: createRefreshToken,
          },
        };
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: 'Unauthorized',
            message: 'Email or password incorrect',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error occurred: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error logged in: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshTokenService(
    request: Request,
  ): Promise<IBaseResponse<RefreshTokenResponseDto>> {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'Refresh token not found',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const { id } = this.jwtService.verify(refreshToken, {
        secret: REFRESH_TOKEN_SECRET,
      });

      const user = await this.usersRepository.findByIdWithRole(id);
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: 'Unauthorized',
            message: 'User not found',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: {
          id: user.roleId.id,
          role_name: user.roleId.role_name,
        },
      };

      const newAccessToken = this.jwtService.sign(payload, {
        secret: ACCESS_TOKEN_SECRET,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Token refreshed successfully',
        data: {
          access_token: newAccessToken,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error occurred: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error refreshing token: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logoutUserService(
    request: Request,
    response: Response,
  ): Promise<WebResponse> {
    const { accessToken, refreshToken } = request.cookies;

    if (!refreshToken && !accessToken) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'User already logged out or not logged in',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      response.clearCookie('accessToken');
      response.clearCookie('refreshToken');
      return {
        statusCode: HttpStatus.OK,
        message: 'Logout successfully',
      };
    } catch (error) {
      this.logger.error(`Error logout: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
