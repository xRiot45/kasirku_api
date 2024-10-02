import { EntityManager } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Users } from 'src/app/users/entities/users.entity';
import { ACCESS_TOKEN_SECRET } from 'src/configs/environment.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly entityManager: EntityManager) {
    super({
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: { email: string }) {
    const { email } = payload;
    const user = await this.entityManager.findOne(Users, {
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
