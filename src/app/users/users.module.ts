import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Role } from '../role/entities/role.entity';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Role])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    UsersService,
    JwtService,
  ],
})
export class UsersModule {}
