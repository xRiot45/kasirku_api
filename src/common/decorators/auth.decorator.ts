import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET } from 'src/configs/environment.config';

// Fungsi AuthDecorator untuk mendapatkan data user dari token jwt yang terdapat di cookies kemudian di decode
export const AuthDecorator = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;

    if (!cookies || !cookies.accessToken) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'User not logged in',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const jwtService = new JwtService({
      secret: ACCESS_TOKEN_SECRET,
    });

    try {
      const decoded = jwtService.verify(cookies.accessToken);
      return decoded;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'Invalid token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  },
);
