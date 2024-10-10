import { Injectable } from '@nestjs/common';
import { IOrdersRepository } from '../interfaces/orders.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/app/products/entities/products.entity';
import { Repository } from 'typeorm';
import { Orders } from '../entities/orders.entity';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}
}
