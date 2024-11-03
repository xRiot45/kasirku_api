import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET } from 'src/configs/environment.config';

@Injectable()
export class CashierGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'Token not found',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const decodedToken = this.jwtService.verify(token, {
      secret: ACCESS_TOKEN_SECRET,
    });
    if (decodedToken.role.role_name !== 'Kasir') {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Forbidden access',
          message: 'Forbidden access',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
