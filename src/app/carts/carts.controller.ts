import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CashierGuard } from './../../common/guards/cashier.guard';
import { CartsService } from './carts.service';
import { CartsRequestDto, CartsResponseDto } from './dtos/carts.dto';

@Controller('/api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('/add-product-to-cart')
  @UseGuards(CashierGuard, AuthGuard)
  async addProductToCartController(
    @Body() request: CartsRequestDto,
  ): Promise<IBaseResponse<CartsResponseDto>> {
    return this.cartsService.addProductToCartService(request);
  }

  @Get('/all')
  @UseGuards(CashierGuard, AuthGuard)
  async findAllProductsInCartController(): Promise<
    IBaseResponse<CartsResponseDto[]>
  > {
    return this.cartsService.findAllProductsInCartService();
  }

  @Delete('/delete/:id')
  @UseGuards(CashierGuard, AuthGuard)
  async deleteCartByIdController(
    @Param('id') id: string,
  ): Promise<WebResponse> {
    return this.cartsService.deleteCartByIdService(id);
  }
}
