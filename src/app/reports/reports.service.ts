import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ICheckoutRepository } from '../checkout/interfaces/checkout.interface';
import { Reports } from './entities/report.entity';
import { IReportsRepository } from './interfaces/reports.interface';
import { ReportsResponseDto } from './dtos/reports.dto';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('IReportsRepository')
    private readonly reportsRepository: IReportsRepository,
    @Inject('ICheckoutRepository')
    private readonly checkoutRepository: ICheckoutRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async createReportsService(): Promise<IBaseResponse<any>> {
    try {
      const checkoutsData = await this.checkoutRepository.getAllDataCheckouts();

      if (!checkoutsData || !Array.isArray(checkoutsData)) {
        this.logger.error('No checkouts data');
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'No checkouts data found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const reportsData = checkoutsData.map((checkout) => ({
        total_order_price: checkout.total_order_price,
        checkout_date: checkout.checkout_date,
        payment_amount: checkout.payment_amount,
        change_returned: checkout.change_returned,
        order_status: checkout.order_status,
        payment_method: checkout.payment_method,
        seat_number: checkout.seat_number,
        invoice: checkout.invoice,
        orders: Array.isArray(checkout.orders) ? checkout.orders : [],
      }));

      const createdReports = await this.reportsRepository.createReports(
        reportsData.map((data) => new Reports(data)),
      );

      const responseData: ReportsResponseDto[] = createdReports.map(
        (report) => ({
          id: report.id,
          invoice: report.invoice,
          reporting_date: report.reporting_date,
          total_order_price: report.total_order_price,
          checkout_date: report.checkout_date,
          payment_amount: report.payment_amount,
          change_returned: report.change_returned,
          order_status: report.order_status,
          payment_method: report.payment_method,
          seat_number: report.seat_number,
          orders: Array.isArray(report.orders)
            ? report.orders.map((order) => ({
                id: order?.id,
                product: {
                  id: order?.productId?.id,
                  product_name: order?.productId?.product_name,
                  product_code: order?.productId?.product_code,
                  product_price: order?.productId?.product_price,
                  product_photo: order?.productId?.product_photo,
                  product_category: {
                    id: order?.productId?.productCategoryId?.id,
                    product_category_name:
                      order?.productId?.productCategoryId
                        ?.product_category_name,
                  },
                },
                selected_variant: order?.selected_variant,
                quantity: order?.quantity,
                total_price: order?.total_price,
              }))
            : [],
        }),
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Reports created successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error create reports: ${error.message}`);
        throw error;
      }
      this.logger.error(`Error creating reports: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
