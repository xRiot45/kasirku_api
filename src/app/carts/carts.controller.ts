import { CashierGuard } from './../../common/guards/cashier.guard';
import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsRequestDto } from './dtos/carts.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('/api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('/add-product-to-cart')
  @UseGuards(CashierGuard, AuthGuard)
  async addProductToCartController(@Body() request: CartsRequestDto) {
    return this.cartsService.addProductToCartService(request);
  }

  @Get('/all')
  @UseGuards(CashierGuard, AuthGuard)
  async findAllProductsInCartController() {
    return this.cartsService.findAllProductsInCartService();
  }
}
