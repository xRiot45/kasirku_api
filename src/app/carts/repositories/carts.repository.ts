import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/app/products/entities/products.entity';
import { Repository } from 'typeorm';
import { Carts } from '../entities/carts.entity';
import { ICartsRepository } from '../interfaces/carts.interface';

@Injectable()
export class CartsRepository implements ICartsRepository {
  constructor(
    @InjectRepository(Carts)
    private readonly cartsRepository: Repository<Carts>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async addProductToCart(data: Carts): Promise<Carts> {
    return await this.cartsRepository.save(data);
  }

  async findProductById(id: string): Promise<Products> {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['productCategoryId'],
    });
  }

  async findAllProductsInCart(): Promise<Carts[]> {
    return await this.cartsRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['productId', 'productId.productCategoryId'],
    });
  }
}
