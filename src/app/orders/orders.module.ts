import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Products } from '../products/entities/products.entity';
import { OrdersRepository } from './repositories/orders.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Products])],
  controllers: [OrdersController],
  providers: [
    {
      provide: 'IOrdersRepository',
      useClass: OrdersRepository,
    },
    OrdersService,
    JwtService,
  ],
})
export class OrdersModule {}
