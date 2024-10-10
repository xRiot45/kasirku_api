import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ICartsRepository } from '../carts/interfaces/carts.interface';
import { OrdersReponseDto } from './dtos/orders.dto';
import { Orders } from './entities/orders.entity';
import { IOrdersRepository } from './interfaces/orders.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('IOrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
    @Inject('ICartsRepository')
    private readonly cartsRepository: ICartsRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async createOrdersService(): Promise<IBaseResponse<OrdersReponseDto[]>> {
    try {
      const carts = await this.cartsRepository.findAllCarts();
      if (!carts || carts.length === 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Cart Is Empty',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const orders: Orders[] = carts.map((cart) => {
        return new Orders({
          productId: cart.productId,
          selected_variant: cart.selected_variant,
          quantity: cart.quantity,
          total_price: Number(cart.productId.product_price) * cart.quantity,
        });
      });

      await this.ordersRepository.createOrders(orders);
      await this.cartsRepository.clearCarts();

      const responseData = orders.map((order) => ({
        id: order.id,
        product: {
          id: order.productId.id,
          product_name: order.productId.product_name,
          product_code: order.productId.product_code,
          product_price: Number(order.productId.product_price),
          product_photos: order.productId.product_photos,
          product_category: {
            id: order.productId.productCategoryId.id,
            product_category_name:
              order.productId.productCategoryId.product_category_name,
          },
        },
        selected_variant: order.selected_variant,
        quantity: order.quantity,
        total_price: order.total_price,
      }));

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create orders successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error create orders: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error create orders: ${error.message}`);
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
