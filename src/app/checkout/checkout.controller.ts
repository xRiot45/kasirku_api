import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutRequestDto } from './dtos/checkout.dto';

@Controller('/api/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async checkoutOrdersController(
    @Body() request: CheckoutRequestDto,
  ): Promise<any> {
    return this.checkoutService.checkoutOrdersService(request);
  }
}
