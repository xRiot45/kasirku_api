import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';
import { Reports } from '../reports/entities/report.entity';
import { Role } from '../role/entities/role.entity';
import { OrderStatusType } from 'src/common/enums/order-status.enum';

@Injectable()
export class ChartsService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Reports)
    private readonly reportsRepository: Repository<Reports>,
  ) {}

  async countDataService(): Promise<IBaseResponse> {
    const users = await this.userRepository.count();
    const products = await this.productsRepository.count();
    const reports = await this.reportsRepository.count();
    const roles = await this.roleRepository.count();

    const data = {
      users,
      products,
      reports,
      roles,
    };

    return {
      statusCode: HttpStatus.OK,
      message: 'Count data successfully',
      data: {
        ...data,
      },
    };
  }

  async countSaleByYearService(year?: string): Promise<IBaseResponse> {
    const data = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };

    const whereCondition = year
      ? {
          reporting_date: Between(
            new Date(`${year}-01-01`),
            new Date(`${year}-12-31`),
          ),
        }
      : {};

    // Pastikan whereCondition diterapkan pada `find`
    const sumTotalOrderPriceByDate = await this.reportsRepository.find({
      select: ['reporting_date', 'total_order_price'],
      where: whereCondition, // tambahkan ini untuk memastikan kondisi diterapkan
    });

    const monthMap = {
      '01': 'jan',
      '02': 'feb',
      '03': 'mar',
      '04': 'apr',
      '05': 'may',
      '06': 'jun',
      '07': 'jul',
      '08': 'aug',
      '09': 'sep',
      '10': 'oct',
      '11': 'nov',
      '12': 'dec',
    };

    sumTotalOrderPriceByDate.forEach((item) => {
      const month = item.reporting_date.toISOString().split('-')[1];
      const monthKey = monthMap[month];

      if (monthKey) {
        data[monthKey] += item.total_order_price;
      }
    });

    const isEmptyData = Object.values(data).every((value) => value === 0);

    if (year && isEmptyData) {
      return {
        statusCode: HttpStatus.OK,
        message: `No sales data found for year ${year}`,
        data: [],
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Count sale by month successfully',
      data,
    };
  }

  async countTotalProfitService(): Promise<IBaseResponse> {
    const totalProfit = await this.reportsRepository.find({
      select: ['total_order_price'],
    });

    const sumTotalProfit = totalProfit.reduce((acc, item) => {
      return acc + item.total_order_price;
    }, 0);

    return {
      statusCode: HttpStatus.OK,
      message: 'Count total profit successfully',
      data: {
        total_profit: sumTotalProfit,
      },
    };
  }

  async countOrderStatusService(): Promise<IBaseResponse> {
    const results = await this.reportsRepository
      .createQueryBuilder('report')
      .select('report.order_status', 'order_status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('report.order_status')
      .getRawMany();

    const data = {
      order_dikonfirmasi: 0,
      order_sedang_diproses: 0,
      order_selesai: 0,
      order_dibatalkan: 0,
    };

    results.forEach((item) => {
      const status = item.order_status;
      const count = parseInt(item.count, 10);

      if (status === OrderStatusType.CONFIRMED) data.order_dikonfirmasi = count;
      else if (status === OrderStatusType.PROCESSING)
        data.order_sedang_diproses = count;
      else if (status === OrderStatusType.COMPLETED) data.order_selesai = count;
      else if (status === OrderStatusType.CANCELED)
        data.order_dibatalkan = count;
    });

    // Return hasil dalam format response
    return {
      statusCode: HttpStatus.OK,
      message: 'Count order by status successfully',
      data: {
        ...data,
      },
    };
  }
}
