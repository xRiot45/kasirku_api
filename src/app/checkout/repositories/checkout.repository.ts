import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAllCheckouts(): Promise<Checkout[]> {
    return this.checkoutRepository.find({
      relations: [
        'orders',
        'orders.productId',
        'orders.productId.productCategoryId',
      ],
    });
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
}
