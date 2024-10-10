import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/app/products/entities/products.entity';
import { DeleteResult, Repository } from 'typeorm';
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

  async deleteCartById(id: string): Promise<DeleteResult> {
    return await this.cartsRepository.delete(id);
  }

  async findCartById(id: string): Promise<Carts> {
    return await this.cartsRepository.findOne({
      where: { id },
      relations: ['productId', 'productId.productCategoryId'],
    });
  }

  async deleteAllCarts(): Promise<void> {
    return await this.cartsRepository.clear();
  }

  async findAllCarts(): Promise<Carts[]> {
    return await this.cartsRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['productId', 'productId.productCategoryId'],
    });
  }

  async findCartItemByProductIdAndVariant(
    productId: string,
    selected_variant: string,
  ): Promise<Carts> {
    return await this.cartsRepository.findOne({
      where: { productId: { id: productId }, selected_variant },
      relations: ['productId', 'productId.productCategoryId'],
    });
  }

  async updateCartItem(id: string, updatedData: Carts): Promise<Carts> {
    await this.cartsRepository.update(id, updatedData);
    return await this.cartsRepository.findOne({
      where: { id },
      relations: ['productId', 'productId.productCategoryId'],
    });
  }

  async clearCarts(): Promise<void> {
    await this.cartsRepository.clear();
  }
}
