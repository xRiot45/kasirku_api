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

  async findAllOrdersService(): Promise<IBaseResponse<OrdersReponseDto[]>> {
    try {
      const orders = await this.ordersRepository.findAllOrders();

      const responseData = orders.map((order) => ({
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
      }));

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Find all orders successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find all orders: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find all orders: ${error.message}`);
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

  async findOrderById(id: string): Promise<IBaseResponse<OrdersReponseDto>> {
    try {
      const order = await this.ordersRepository.findOrderById(id);
      if (!order) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Order not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Find order by id successfully',
        data: {
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
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find order by id: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find order by id: ${error.message}`);
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

  async deleteAllOrdersService(): Promise<WebResponse> {
    try {
      const orders = await this.ordersRepository.findAllOrders();
      if (!orders || orders.length === 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Orders Is Empty',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.ordersRepository.deleteAllOrders();
      return {
        statusCode: HttpStatus.OK,
        message: 'Delete all orders successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error delete all orders: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error delete all orders: ${error.message}`);
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

  async deleteOrderByIdService(id: string): Promise<WebResponse> {
    try {
      const order = await this.ordersRepository.findOrderById(id);
      if (!order) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Orders Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.ordersRepository.deleteOrder(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Order deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error delete order: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error delete order: ${error.message}`);
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
