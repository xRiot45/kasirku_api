import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  CountDataResponseDto,
  CountOrderStatusResponseDto,
  CountSaleByYearResponseDto,
  CountTotalProfitResponseDto,
} from './dtos/charts.dto';

@Controller('/api/charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get('/count-data')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countDataController(): Promise<IBaseResponse<CountDataResponseDto>> {
    return this.chartsService.countDataService();
  }

  @Get('/sale-by-year')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countSaleByYearController(
    @Query('year') year?: string,
  ): Promise<IBaseResponse<CountSaleByYearResponseDto>> {
    return this.chartsService.countSaleByYearService(year);
  }

  @Get('/total-profit')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countTotalProfitController(): Promise<
    IBaseResponse<CountTotalProfitResponseDto>
  > {
    return this.chartsService.countTotalProfitService();
  }

  @Get('/count-order-status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async countOrderStatusController(): Promise<
    IBaseResponse<CountOrderStatusResponseDto>
  > {
    return this.chartsService.countOrderStatusService();
  }
}
