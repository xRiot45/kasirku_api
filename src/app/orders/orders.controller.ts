import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CashierGuard } from 'src/common/guards/cashier.guard';
import { OrdersReponseDto } from './dtos/orders.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @UseGuards(AuthGuard, CashierGuard)
  async createOrdersController(): Promise<IBaseResponse<OrdersReponseDto[]>> {
    return this.ordersService.createOrdersService();
  }

  @Get('/all')
  @UseGuards(AuthGuard, CashierGuard)
  async findAllOrdersController(): Promise<IBaseResponse<OrdersReponseDto[]>> {
    return this.ordersService.findAllOrdersService();
  }
}
