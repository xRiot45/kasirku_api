import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICheckoutRepository } from './interfaces/checkout.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { IOrdersRepository } from '../orders/interfaces/orders.interface';
import { CheckoutRequestDto } from './dtos/checkout.dto';
import { OrderStatusType } from 'src/common/enums/order-status.enum';
import { PaymentMethodType } from 'src/common/enums/payment-method.enum';
import { Checkout } from './entities/checkout.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject('ICheckoutRepository')
    private readonly checkoutRepository: ICheckoutRepository,
    @Inject('IOrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async checkoutOrdersService(request: CheckoutRequestDto): Promise<any> {
    const { payment_amount, seat_number } = request;
    try {
      const uncheckedOrders =
        await this.ordersRepository.findAllUncheckedOrders();

      if (uncheckedOrders.length === 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Unchecked orders is empty',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const totalOrderPrice = uncheckedOrders.reduce(
        (sum, order) => sum + order.total_price,
        0,
      );

      const payload = {
        total_order_price: totalOrderPrice,
        payment_amount,
        change_returned: payment_amount - totalOrderPrice,
        seat_number,
        order_status: OrderStatusType.CONFIRMED,
        payment_method: PaymentMethodType.CASH,
      };

      const checkout = new Checkout(payload);
      const savedCheckout = await this.checkoutRepository.checkoutOrders([
        checkout,
      ]);

      const checkoutId = savedCheckout[0];

      for (const order of uncheckedOrders) {
        order.checkoutId = checkoutId;
        await this.ordersRepository.save([order]);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Checkout successfully',
        data: {
          checkout,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
