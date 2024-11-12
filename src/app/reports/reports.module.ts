import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './repositories/reports.repository';
import { OrdersRepository } from '../orders/repositories/orders.repository';
import { CheckoutRepository } from '../checkout/repositories/checkout.repository';
import { Orders } from '../orders/entities/orders.entity';
import { Checkout } from '../checkout/entities/checkout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reports, Orders, Checkout])],
  controllers: [ReportsController],
  providers: [
    {
      provide: 'IReportsRepository',
      useClass: ReportsRepository,
    },
    {
      provide: 'IOrdersRepository',
      useClass: OrdersRepository,
    },
    {
      provide: 'ICheckoutRepository',
      useClass: CheckoutRepository,
    },
    ReportsService,
    JwtService,
  ],
})
export class ReportsModule {}
