import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Role } from '../role/entities/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET } from 'src/configs/environment.config';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Role]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 24,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    AuthService,
  ],
})
export class AuthModule {}
