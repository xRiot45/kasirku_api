import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RoleModule, UsersModule, AuthModule],
  providers: [],
})
export class AppModule {}
