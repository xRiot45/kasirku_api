import { Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CashierGuard } from 'src/common/guards/cashier.guard';
import { OrdersReponseDto } from './dtos/orders.dto';
import { OrdersService } from './orders.service';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @UseGuards(AdminGuard, CashierGuard)
  async createOrdersController(): Promise<IBaseResponse<OrdersReponseDto[]>> {
    return this.ordersService.createOrdersService();
  }
}
