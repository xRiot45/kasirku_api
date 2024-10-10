import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from '../carts/entities/carts.entity';
import { CartsRepository } from '../carts/repositories/carts.repository';
import { Products } from '../products/entities/products.entity';
import { Orders } from './entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './repositories/orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Products, Carts])],
  controllers: [OrdersController],
  providers: [
    {
      provide: 'IOrdersRepository',
      useClass: OrdersRepository,
    },
    {
      provide: 'ICartsRepository',
      useClass: CartsRepository,
    },
    OrdersService,
    JwtService,
  ],
})
export class OrdersModule {}
