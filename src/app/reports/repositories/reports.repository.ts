import { Injectable } from '@nestjs/common';
import { IReportsRepository } from '../interfaces/reports.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from '../entities/report.entity';
import { Repository } from 'typeorm';
import { Orders } from 'src/app/orders/entities/orders.entity';
import { Checkout } from 'src/app/checkout/entities/checkout.entity';

@Injectable()
export class ReportsRepository implements IReportsRepository {
  constructor(
    @InjectRepository(Reports)
    private readonly reportsRepository: Repository<Reports>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Checkout)
    private readonly checkoutRepository: Repository<Checkout>,
  ) {}

  async createReports(data: Reports[]): Promise<Reports[]> {
    const savedReports = await this.reportsRepository.save(data);

    await this.ordersRepository.createQueryBuilder().delete().execute();
    await this.checkoutRepository.createQueryBuilder().delete().execute();
    return savedReports;
  }

  async countFilteredReports(reporting_date: string): Promise<number> {
    const query = this.reportsRepository.createQueryBuilder('report');

    if (reporting_date) {
      query.andWhere('report.reporting_date = :reporting_date', {
        reporting_date: reporting_date,
      });
    }

    return query.getCount();
  }

  async findAllReports(
    skip: number,
    take: number,
    reporting_date: string,
  ): Promise<Reports[]> {
    const query = this.reportsRepository
      .createQueryBuilder('report')
      .skip(skip)
      .take(take);

    if (reporting_date) {
      query.where('report.reporting_date LIKE :reporting_date', {
        reporting_date: `%${reporting_date}%`,
      });
    }

    return query.getMany();
  }

  async findReportById(id: string): Promise<Reports | undefined> {
    return await this.reportsRepository.findOne({
      where: { id },
    });
  }
}
