import { Injectable } from '@nestjs/common';
import { IProductCategory } from '../interfaces/product_category.interface';
import { ProductCategory } from '../entities/product_category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryRepository implements IProductCategory {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(data: ProductCategory): Promise<ProductCategory> {
    return await this.productCategoryRepository.save(data);
  }

  async findByProductCategoryName(
    product_category_name: string,
  ): Promise<ProductCategory | undefined> {
    return await this.productCategoryRepository.findOne({
      where: { product_category_name },
    });
  }

  async findAllProductCategory(
    skip: number,
    take: number,
  ): Promise<ProductCategory[]> {
    return await this.productCategoryRepository.find({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  async countProductCategory(): Promise<number> {
    return await this.productCategoryRepository.count();
  }

  async findById(id: string): Promise<ProductCategory> {
    return await this.productCategoryRepository.findOne({ where: { id } });
  }

  async countFilteredProductCategory(
    product_category_name: string,
  ): Promise<number> {
    const query =
      this.productCategoryRepository.createQueryBuilder('product_category');

    if (product_category_name) {
      query.andWhere(
        'LOWER(product_category_name) LIKE :product_category_name',
        {
          product_category_name: `%${product_category_name.toLowerCase()}%`,
        },
      );
    }

    return await query.getCount();
  }

  async searchProductCategory(
    skip: number,
    take: number,
    product_category_name: string,
  ): Promise<ProductCategory[]> {
    const query = this.productCategoryRepository
      .createQueryBuilder('product_category')
      .skip(skip)
      .take(take);

    if (product_category_name) {
      query.where(
        'LOWER(product_category.product_category_name) LIKE :product_category_name',
        { product_category_name: `%${product_category_name.toLowerCase()}%` },
      );
    }

    return query.getMany();
  }

  async updateProductCategory(
    id: string,
    data: Partial<ProductCategory>,
  ): Promise<void> {
    await this.productCategoryRepository.update(id, data);
  }

  async deleteProductCategory(id: string): Promise<void> {
    await this.productCategoryRepository.delete(id);
  }
}
