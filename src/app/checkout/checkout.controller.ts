import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CashierGuard } from 'src/common/guards/cashier.guard';
import { CheckoutService } from './checkout.service';
import { CheckoutRequestDto, CheckoutResponseDto } from './dtos/checkout.dto';

@Controller('/api/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
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
  async findCheckoutByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.findCheckoutByIdService(id);
  }
}
