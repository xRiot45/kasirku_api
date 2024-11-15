import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusType } from 'src/common/enums/order-status.enum';
import { Repository } from 'typeorm';
import { Checkout } from '../entities/checkout.entity';
import { ICheckoutRepository } from '../interfaces/checkout.interface';

@Injectable()
export class CheckoutRepository implements ICheckoutRepository {
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutRepository: Repository<Checkout>,
  ) {}

  async checkoutOrders(data: Checkout[]): Promise<Checkout[]> {
    return this.checkoutRepository.save(data);
  }

  async findAllCheckouts(
    skip: number,
    take: number,
    order_status: string,
    orderBy: string = 'checkouts.createdAt',
    orderDirection: 'ASC' | 'DESC' = 'DESC',
  ): Promise<Checkout[]> {
    const query = this.checkoutRepository
      .createQueryBuilder('checkouts')
      .leftJoinAndSelect('checkouts.orders', 'orders')
      .leftJoinAndSelect('orders.productId', 'productId')
      .leftJoinAndSelect('productId.productCategoryId', 'productCategoryId')
      .skip(skip)
      .take(take)
      .orderBy(orderBy, orderDirection);

    if (order_status) {
      query.where('order_status LIKE :order_status', {
        order_status: `%${order_status}%`,
      });
    }

    return query.getMany();
  }

  async getAllDataCheckouts(): Promise<any> {
    const query = await this.checkoutRepository
      .createQueryBuilder('checkout')
      .leftJoinAndSelect('checkout.orders', 'orders')
      .leftJoinAndSelect('orders.productId', 'product')
      .leftJoinAndSelect('product.productCategoryId', 'category');

    return query.getMany();
  }

  async findCheckoutById(id: string): Promise<Checkout> {
    return this.checkoutRepository.findOne({
      where: { id },
      relations: [
        'orders',
        'orders.productId',
        'orders.productId.productCategoryId',
      ],
    });
  }

  async changeOrderStatusToConfirmed(id: string): Promise<void> {
    await this.checkoutRepository.update(id, {
      order_status: OrderStatusType.CONFIRMED,
    });
  }

  async changeOrderStatusToProcessed(id: string): Promise<void> {
    await this.checkoutRepository.update(id, {
      order_status: OrderStatusType.PROCESSING,
    });
  }

  async changeOrderStatusToCompleted(id: string): Promise<void> {
    await this.checkoutRepository.update(id, {
      order_status: OrderStatusType.COMPLETED,
    });
  }

  async changeOrderStatusToCancelled(id: string): Promise<void> {
    await this.checkoutRepository.update(id, {
      order_status: OrderStatusType.CANCELED,
    });
  }

  async countFilteredCheckouts(order_status: OrderStatusType): Promise<number> {
    const query = this.checkoutRepository
      .createQueryBuilder('checkout')
      .leftJoinAndSelect('checkout.orders', 'orders')
      .leftJoinAndSelect('orders.productId', 'product')
      .leftJoinAndSelect('product.productCategoryId', 'category');

    if (order_status) {
      query.where('checkout.order_status LIKE :order_status', {
        order_status: `%${order_status}%`,
      });
    }

    return query.getCount();
  }

  async removeCheckout(id: string): Promise<void> {
    await this.checkoutRepository.delete(id);
  }
}
