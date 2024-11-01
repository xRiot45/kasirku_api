import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { IOrdersRepository } from '../interfaces/orders.interface';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  async createOrders(data: Orders[]): Promise<Orders[]> {
    return await this.ordersRepository.save(data);
  }

  async findAllOrders(): Promise<Orders[]> {
    return await this.ordersRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.productId', 'product')
      .leftJoinAndSelect('product.productCategoryId', 'productCategory')
      .where('orders.checkoutId IS NULL')
      .getMany();
  }

  async findOrderById(id: string): Promise<Orders> {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: ['productId', 'productId.productCategoryId'],
    });
  }

  async deleteOrder(id: string): Promise<DeleteResult> {
    return await this.ordersRepository.delete(id);
  }

  async deleteAllOrders(): Promise<void> {
    return await this.ordersRepository.clear();
  }

  // async findAllUncheckedOrders(): Promise<Orders[]> {
  //   return await this.ordersRepository.find({
  //     where: { checkoutId: null },
  //     relations: ['productId', 'productId.productCategoryId'],
  //   });
  // }

  async findAllUncheckedOrders(): Promise<Orders[]> {
    const orders = await this.ordersRepository.find({
      relations: ['productId', 'productId.productCategoryId', 'checkoutId'],
    });

    // Memfilter orders yang checkoutId nya null
    return orders.filter((order) => order.checkoutId === null);
  }

  async save(orders: Orders[]): Promise<Orders[]> {
    return this.ordersRepository.save(orders);
  }
}
