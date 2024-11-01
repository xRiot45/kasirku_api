import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CashierGuard } from 'src/common/guards/cashier.guard';
import { CheckoutService } from './checkout.service';
import { CheckoutRequestDto, CheckoutResponseDto } from './dtos/checkout.dto';
import { OrderStatusType } from 'src/common/enums/order-status.enum';

@Controller('/api/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/create')
  @UseGuards(CashierGuard, AuthGuard)
  async checkoutOrdersController(
    @Body() request: CheckoutRequestDto,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.checkoutOrdersService(request);
  }

  @Get('/all')
  @UseGuards(CashierGuard, AuthGuard)
  async findAllCheckoutController(): Promise<
    IBaseResponse<CheckoutRequestDto[]>
  > {
    return this.checkoutService.findAllCheckoutsService();
  }

  @Get('/show/:id')
  @UseGuards(CashierGuard, AuthGuard)
  async findCheckoutByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.findCheckoutByIdService(id);
  }

  @Put('/status/confirmed/:id')
  @UseGuards(CashierGuard, AuthGuard)
  async changeOrderStatusToConfirmedController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToConfirmedService(id);
  }

  @Put('/status/processed/:id')
  @UseGuards(CashierGuard, AuthGuard)
  async changeOrderStatusToProcessedController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToProcessedService(id);
  }

  @Put('/status/completed/:id')
  @UseGuards(CashierGuard, AuthGuard)
  async changeOrderStatusToCompletedController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToCompletedService(id);
  }

  @Put('/status/cancelled/:id')
  @UseGuards(CashierGuard, AuthGuard)
  async changeOrderStatusToCancelledController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToCancelledService(id);
  }

  @Get('/filter')
  @UseGuards(CashierGuard, AuthGuard)
  async filterCheckoutsController(
    @Query('order_status') orderStatus: OrderStatusType,
  ): Promise<IBaseResponse<CheckoutResponseDto[]>> {
    return this.checkoutService.filterCheckouts(orderStatus);
  }
}
