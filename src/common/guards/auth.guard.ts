import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET } from 'src/configs/environment.config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'Authorization header not found',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authorizationHeader.split(' ')[1];
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

    try {
      const decoded = this.jwtService.verify(token, {
        secret: ACCESS_TOKEN_SECRET,
      });
      request.user = decoded;
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
