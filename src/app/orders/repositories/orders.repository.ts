import { Injectable } from '@nestjs/common';
import { IOrdersRepository } from '../interfaces/orders.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/app/products/entities/products.entity';
import { Repository } from 'typeorm';
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
}
