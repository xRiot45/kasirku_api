import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { ProductModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ReportsModule } from './reports/reports.module';
import { ChartsModule } from './charts/charts.module';

@Module({
  imports: [
    RoleModule,
    UsersModule,
    AuthModule,
    ProductCategoryModule,
    ProductModule,
    CartsModule,
    OrdersModule,
    CheckoutModule,
    ReportsModule,
    ChartsModule,
  ],
  providers: [],
})
export class AppModule {}
