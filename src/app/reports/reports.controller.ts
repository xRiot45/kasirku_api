import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ReportsResponseDto, SearchReports } from './dtos/reports.dto';

@Controller('/api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('/create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  async createReportsController(): Promise<
    IBaseResponse<ReportsResponseDto[]>
  > {
    return this.reportsService.createReportsService();
  }

  @Get('/all')
  //   @UseGuards(AuthGuard, RolesGuard)
  //   @Roles('Admin')
  async findAllReportsController(
    @Query() query: SearchReports,
  ): Promise<IBaseResponse<ReportsResponseDto[]>> {
    const { page, limit, reporting_date } = query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.reportsService.findAllReportsService(
      pageNumber,
      limitNumber,
      reporting_date,
    );
  }
}
