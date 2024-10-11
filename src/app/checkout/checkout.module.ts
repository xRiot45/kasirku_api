import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { Orders } from '../orders/entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkout, Orders])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
