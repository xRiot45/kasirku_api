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
    const data = {};

    const whereCondition = year
      ? {
          reporting_date: Between(
            new Date(`${year}-01-01`),
            new Date(`${year}-12-31`),
          ),
        }
      : {};

    const sumTotalOrderPriceByDate = await this.reportsRepository.find({
      select: ['reporting_date', 'total_order_price'],
      ...whereCondition,
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
      const date = item.reporting_date.toISOString().split('-');
      const year = date[0];
      const month = date[1];
      const monthKey = monthMap[month];

      if (!data[year]) {
        data[year] = {
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
      }

      if (monthKey) {
        data[year][monthKey] += item.total_order_price;
      }
    });

    if (year && !data[year]) {
      return {
        statusCode: HttpStatus.OK,
        message: `No sales data found for year ${year}`,
        data: [],
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Count sale by month and year successfully',
      data: year ? data[year] : data,
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
    // Query untuk menghitung jumlah order berdasarkan `order_status`
    const results = await this.reportsRepository
      .createQueryBuilder('report')
      .select('report.order_status', 'order_status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('report.order_status')
      .getRawMany();

    // Inisialisasi data dengan jumlah 0 untuk setiap status
    const data = {
      [OrderStatusType.CONFIRMED]: 0,
      [OrderStatusType.PROCESSING]: 0,
      [OrderStatusType.COMPLETED]: 0,
      [OrderStatusType.CANCELED]: 0,
    };

    // Map hasil query ke dalam objek `data`
    results.forEach((item) => {
      const status = item.order_status;
      const count = parseInt(item.count, 10);

      if (status === OrderStatusType.CONFIRMED)
        data[OrderStatusType.CONFIRMED] = count;
      else if (status === OrderStatusType.PROCESSING)
        data[OrderStatusType.PROCESSING] = count;
      else if (status === OrderStatusType.COMPLETED)
        data[OrderStatusType.COMPLETED] = count;
      else if (status === OrderStatusType.CANCELED)
        data[OrderStatusType.CANCELED] = count;
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
