import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';

@Module({
  imports: [RoleModule],
  providers: [],
})
export class AppModule {}
