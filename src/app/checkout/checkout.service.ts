import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { OrderStatusType } from 'src/common/enums/order-status.enum';
import { PaymentMethodType } from 'src/common/enums/payment-method.enum';
import { generateInvoiceNumber } from 'src/common/helpers/generateInvoice.helper';
import { Logger } from 'winston';
import { IOrdersRepository } from '../orders/interfaces/orders.interface';
import { CheckoutRequestDto, CheckoutResponseDto } from './dtos/checkout.dto';
import { Checkout } from './entities/checkout.entity';
import { ICheckoutRepository } from './interfaces/checkout.interface';

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

  async checkoutOrdersService(
    request: CheckoutRequestDto,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    const { payment_amount, seat_number } = request;
    try {
      const uncheckedOrders =
        await this.ordersRepository.findAllUncheckedOrders();

      if (uncheckedOrders.length === 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'All orders have been checked out',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const totalOrderPrice = uncheckedOrders.reduce(
        (sum, order) => sum + order.total_price,
        0,
      );

      if (payment_amount < totalOrderPrice) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: 'Payment amount is less than total order price',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const generateInvoice = generateInvoiceNumber();

      const payload = {
        invoice: generateInvoice,
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

      const responseData: CheckoutResponseDto = {
        id: checkout.id,
        invoice: checkout.invoice,
        total_order_price: checkout.total_order_price,
        checkout_date: checkout.checkout_date,
        payment_amount: checkout.payment_amount,
        change_returned: checkout.change_returned,
        order_status: checkout.order_status,
        payment_method: checkout.payment_method,
        seat_number: checkout.seat_number,
        orders: uncheckedOrders.map((order) => ({
          id: order.id,
          product: {
            id: order.productId.id,
            product_name: order.productId.product_name,
            product_code: order.productId.product_code,
            product_price: Number(order.productId.product_price),
            product_photo: order.productId.product_photo,
            product_category: {
              id: order.productId.productCategoryId.id,
              product_category_name:
                order.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: order.selected_variant,
          quantity: order.quantity,
          total_price: order.total_price,
        })),
      };

      return {
        statusCode: HttpStatus.OK,
        message: 'Checkout successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error checkout orders: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error checkout orders: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllCheckoutsService(
    page: number = 1,
    limit: number = 1,
    order_status: OrderStatusType,
  ): Promise<IBaseResponse<CheckoutResponseDto[]>> {
    try {
      const skip = (page - 1) * limit;
      const totalCheckouts =
        await this.checkoutRepository.countFilteredCheckouts(order_status);

      const totalPages = Math.ceil(totalCheckouts / limit);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;

      const checkouts = await this.checkoutRepository.findAllCheckouts(
        skip,
        limit,
        order_status,
      );

      if (!checkouts) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Checkouts is empty',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const responseData: CheckoutResponseDto[] = checkouts.map((checkout) => ({
        id: checkout.id,
        invoice: checkout.invoice,
        total_order_price: checkout.total_order_price,
        checkout_date: checkout.checkout_date,
        payment_amount: checkout.payment_amount,
        change_returned: checkout.change_returned,
        order_status: checkout.order_status,
        payment_method: checkout.payment_method,
        seat_number: checkout.seat_number,
        orders: checkout.orders.map((order) => ({
          id: order.id,
          product: {
            id: order.productId.id,
            product_name: order.productId.product_name,
            product_code: order.productId.product_code,
            product_price: Number(order.productId.product_price),
            product_photo: order.productId.product_photo,
            product_category: {
              id: order.productId.productCategoryId.id,
              product_category_name:
                order.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: order.selected_variant,
          quantity: order.quantity,
          total_price: order.total_price,
        })),
      }));

      return {
        statusCode: HttpStatus.OK,
        message: 'Find all checkout successfully',
        data: responseData,
        totalItems: totalCheckouts,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find all checkout: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find all checkout: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findCheckoutByIdService(
    id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    try {
      const checkout = await this.checkoutRepository.findCheckoutById(id);
      if (!checkout) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Checkout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const responseData: CheckoutResponseDto = {
        id: checkout.id,
        invoice: checkout.invoice,
        total_order_price: checkout.total_order_price,
        checkout_date: checkout.checkout_date,
        payment_amount: checkout.payment_amount,
        change_returned: checkout.change_returned,
        order_status: checkout.order_status,
        payment_method: checkout.payment_method,
        seat_number: checkout.seat_number,
        orders: checkout.orders.map((order) => ({
          id: order.id,
          product: {
            id: order.productId.id,
            product_name: order.productId.product_name,
            product_code: order.productId.product_code,
            product_price: Number(order.productId.product_price),
            product_photo: order.productId.product_photo,
            product_category: {
              id: order.productId.productCategoryId.id,
              product_category_name:
                order.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: order.selected_variant,
          quantity: order.quantity,
          total_price: order.total_price,
        })),
      };

      return {
        statusCode: HttpStatus.OK,
        message: 'Find checkout by id successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find checkout by id: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find checkout by id: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changeOrderStatusToConfirmedService(
    id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    try {
      const checkout = await this.checkoutRepository.findCheckoutById(id);
      if (!checkout) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Checkout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.checkoutRepository.changeOrderStatusToConfirmed(id);
      const updatedData = await this.checkoutRepository.findCheckoutById(id);

      const responseData: CheckoutResponseDto = {
        id: updatedData.id,
        invoice: updatedData.invoice,
        total_order_price: updatedData.total_order_price,
        checkout_date: updatedData.checkout_date,
        payment_amount: updatedData.payment_amount,
        change_returned: updatedData.change_returned,
        order_status: updatedData.order_status,
        payment_method: updatedData.payment_method,
        seat_number: updatedData.seat_number,
        orders: updatedData.orders.map((order) => ({
          id: order.id,
          product: {
            id: order.productId.id,
            product_name: order.productId.product_name,
            product_code: order.productId.product_code,
            product_price: Number(order.productId.product_price),
            product_photo: order.productId.product_photo,
            product_category: {
              id: order.productId.productCategoryId.id,
              product_category_name:
                order.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: order.selected_variant,
          quantity: order.quantity,
          total_price: order.total_price,
        })),
      };

      return {
        statusCode: HttpStatus.OK,
        message: 'Change order status to confirmed successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(
          `Error change order status to confirmed: ${error.message}`,
        );
        throw error;
      }

      this.logger.error(
        `Error change order status to confirmed: ${error.message}`,
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changeOrderStatusToProcessedService(
    id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    try {
      const checkout = await this.checkoutRepository.findCheckoutById(id);
      if (!checkout) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Checkout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.checkoutRepository.changeOrderStatusToProcessed(id);
      const updatedData = await this.checkoutRepository.findCheckoutById(id);

      const responseData: CheckoutResponseDto = {
        id: updatedData.id,
        invoice: updatedData.invoice,
        total_order_price: updatedData.total_order_price,
        checkout_date: updatedData.checkout_date,
        payment_amount: updatedData.payment_amount,
        change_returned: updatedData.change_returned,
        order_status: updatedData.order_status,
        payment_method: updatedData.payment_method,
        seat_number: updatedData.seat_number,
        orders: updatedData.orders.map((order) => ({
          id: order.id,
          product: {
            id: order.productId.id,
            product_name: order.productId.product_name,
            product_code: order.productId.product_code,
            product_price: Number(order.productId.product_price),
            product_photo: order.productId.product_photo,
            product_category: {
              id: order.productId.productCategoryId.id,
              product_category_name:
                order.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: order.selected_variant,
          quantity: order.quantity,
          total_price: order.total_price,
        })),
      };

      return {
        statusCode: HttpStatus.OK,
        message: 'Change order status to processed successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(
          `Error change order status to processed: ${error.message}`,
        );
        throw error;
      }

      this.logger.error(
        `Error change order status to processed: ${error.message}`,
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changeOrderStatusToCompletedService(
    id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    try {
      const checkout = await this.checkoutRepository.findCheckoutById(id);
      if (!checkout) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Checkout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.checkoutRepository.changeOrderStatusToCompleted(id);
      const updatedData = await this.checkoutRepository.findCheckoutById(id);

      const responseData: CheckoutResponseDto = {
        id: updatedData.id,
        invoice: updatedData.invoice,
        total_order_price: updatedData.total_order_price,
        checkout_date: updatedData.checkout_date,
        payment_amount: updatedData.payment_amount,
        change_returned: updatedData.change_returned,
        order_status: updatedData.order_status,
        payment_method: updatedData.payment_method,
        seat_number: updatedData.seat_number,
        orders: updatedData.orders.map((order) => ({
          id: order.id,
          product: {
            id: order.productId.id,
            product_name: order.productId.product_name,
            product_code: order.productId.product_code,
            product_price: Number(order.productId.product_price),
            product_photo: order.productId.product_photo,
            product_category: {
              id: order.productId.productCategoryId.id,
              product_category_name:
                order.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: order.selected_variant,
          quantity: order.quantity,
          total_price: order.total_price,
        })),
      };

      return {
        statusCode: HttpStatus.OK,
        message: 'Change order status to completed successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(
          `Error change order status to completed: ${error.message}`,
        );
        throw error;
      }

      this.logger.error(
        `Error change order status to completed: ${error.message}`,
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changeOrderStatusToCancelledService(
    id: string,
  ): Promise<IBaseResponse<CheckoutResponseDto>> {
    try {
      const checkout = await this.checkoutRepository.findCheckoutById(id);
      if (!checkout) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Checkout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.checkoutRepository.changeOrderStatusToCancelled(id);
      const updatedData = await this.checkoutRepository.findCheckoutById(id);

      const responseData: CheckoutResponseDto = {
        id: updatedData.id,
        invoice: updatedData.invoice,
        total_order_price: updatedData.total_order_price,
        checkout_date: updatedData.checkout_date,
        payment_amount: updatedData.payment_amount,
        change_returned: updatedData.change_returned,
        order_status: updatedData.order_status,
        payment_method: updatedData.payment_method,
        seat_number: updatedData.seat_number,
        orders: updatedData.orders.map((order) => ({
          id: order.id,
          product: {
            id: order.productId.id,
            product_name: order.productId.product_name,
            product_code: order.productId.product_code,
            product_price: Number(order.productId.product_price),
            product_photo: order.productId.product_photo,
            product_category: {
              id: order.productId.productCategoryId.id,
              product_category_name:
                order.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: order.selected_variant,
          quantity: order.quantity,
          total_price: order.total_price,
        })),
      };

      return {
        statusCode: HttpStatus.OK,
        message: 'Change order status to cancelled successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(
          `Error change order status to cancelled: ${error.message}`,
        );
        throw error;
      }

      this.logger.error(
        `Error change order status to cancelled: ${error.message}`,
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCheckoutService(id: string): Promise<WebResponse> {
    try {
      const findCheckout = await this.checkoutRepository.findCheckoutById(id);
      if (!findCheckout) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Checkout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.checkoutRepository.removeCheckout(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Remove checkout successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error remove checkout: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error remove checkout: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
