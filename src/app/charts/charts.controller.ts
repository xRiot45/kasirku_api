import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('/api/charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get('/count-data')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countDataController(): Promise<IBaseResponse> {
    return this.chartsService.countDataService();
  }

  @Get('/sale-by-month')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countSaleByMonthController(): Promise<IBaseResponse> {
    return this.chartsService.countSaleByMonthService();
  }

  @Get('/total-profit')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countTotalProfitController(): Promise<IBaseResponse> {
    return this.chartsService.countTotalProfitService();
  }

  @Get('/count-order-status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countOrderStatusController(): Promise<IBaseResponse> {
    return this.chartsService.countOrderStatusService();
  }
}
