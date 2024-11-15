import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CashierGuard } from 'src/common/guards/cashier.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CheckoutService } from './checkout.service';
import {
  CheckoutRequestDto,
  CheckoutResponseDto,
  SearchCheckoutsDto,
} from './dtos/checkout.dto';

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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Kasir', 'Koki')
  async findAllCheckoutController(
    @Query() query: SearchCheckoutsDto,
  ): Promise<IBaseResponse<CheckoutRequestDto[]>> {
    const { page, limit, order_status } = query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.checkoutService.findAllCheckoutsService(
      pageNumber,
      limitNumber,
      order_status,
    );
  }

  @Get('/show/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Kasir', 'Koki')
  async findCheckoutByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.findCheckoutByIdService(id);
  }

  @Put('/status/confirmed/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Kasir')
  async changeOrderStatusToConfirmedController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToConfirmedService(id);
  }

  @Put('/status/processed/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Kasir', 'Koki')
  async changeOrderStatusToProcessedController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToProcessedService(id);
  }

  @Put('/status/completed/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Kasir', 'Koki')
  async changeOrderStatusToCompletedController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToCompletedService(id);
  }

  @Put('/status/cancelled/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Kasir')
  async changeOrderStatusToCancelledController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    return this.checkoutService.changeOrderStatusToCancelledService(id);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Kasir')
  async deleteCheckoutController(
    @Param('id') id: string,
  ): Promise<WebResponse> {
    return this.checkoutService.deleteCheckoutService(id);
  }
}
