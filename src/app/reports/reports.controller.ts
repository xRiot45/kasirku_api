import { Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('/api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('/create')
  async createReportsController() {
    return this.reportsService.createReportsService();
  }
}
