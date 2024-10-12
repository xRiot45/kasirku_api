import { Controller, Post, Body, Get } from '@nestjs/common';
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
  async findAllCheckoutController(): Promise<
    IBaseResponse<CheckoutRequestDto[]>
  > {
    return this.checkoutService.findAllCheckoutsService();
  }
}
