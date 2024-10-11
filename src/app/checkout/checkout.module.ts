import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../orders/entities/orders.entity';
import { OrdersRepository } from '../orders/repositories/orders.repository';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Checkout } from './entities/checkout.entity';
import { CheckoutRepository } from './repositories/checkout.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Checkout, Orders])],
  controllers: [CheckoutController],
  providers: [
    {
      provide: 'ICheckoutRepository',
      useClass: CheckoutRepository,
    },
    {
      provide: 'IOrdersRepository',
      useClass: OrdersRepository,
    },
    CheckoutService,
    JwtService,
  ],
})
export class CheckoutModule {}
