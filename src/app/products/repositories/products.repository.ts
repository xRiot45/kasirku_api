import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/app/product_category/entities/product_category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { IProductsRepository } from '../interfaces/products.interface';

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

  async deleteProduct(id: string): Promise<DeleteResult> {
    return await this.productsRepository.delete(id);
  }

  async findById(id: string): Promise<Products | undefined> {
    return await this.productsRepository.findOne({
      where: { id },
    });
  }
}
