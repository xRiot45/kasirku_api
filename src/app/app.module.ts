import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product_category/product_category.module';

@Module({
  imports: [RoleModule, UsersModule, AuthModule, ProductCategoryModule],
  providers: [],
})
export class AppModule {}
