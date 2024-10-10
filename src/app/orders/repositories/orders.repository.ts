import { Injectable } from '@nestjs/common';
import { IOrdersRepository } from '../interfaces/orders.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/app/products/entities/products.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { Carts } from 'src/app/carts/entities/carts.entity';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Carts)
    private readonly cartsRepository: Repository<Carts>,
  ) {}

  async createOrders(data: Orders[]): Promise<Orders[]> {
    return await this.ordersRepository.save(data);
  }

  async findAllOrders(): Promise<Orders[]> {
    return await this.ordersRepository.find({
      relations: ['productId', 'productId.productCategoryId'],
    });
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
}
