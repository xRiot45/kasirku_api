import { Injectable } from '@nestjs/common';
import { IProductsRepository } from '../interfaces/products.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from 'src/app/product_category/entities/product_category.entity';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async createProduct(data: Products): Promise<Products> {
    return await this.productsRepository.save(data);
  }

  async findProductName(productName: string): Promise<Products | undefined> {
    return await this.productsRepository.findOne({
      where: { product_name: productName },
    });
  }

  async findProductCategoryId(
    id: string,
  ): Promise<ProductCategory | undefined> {
    return await this.productCategoryRepository.findOne({
      where: { id },
    });
  }
}
