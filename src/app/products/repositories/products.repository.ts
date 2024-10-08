import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/app/product_category/entities/product_category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { IProductsRepository } from '../interfaces/products.interface';
import { ProductStatusType } from 'src/common/enums/product-status.enum';

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
      relations: ['productCategoryId'],
    });
  }

  async findAllProduct(skip: number, take: number): Promise<Products[]> {
    return this.productsRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['productCategoryId'],
      skip,
      take,
    });
  }

  async countProducts(): Promise<number> {
    return await this.productsRepository.count();
  }

  async updateProduct(id: string, data: Products): Promise<Products> {
    await this.productsRepository.update(id, data);

    return this.productsRepository.findOne({
      where: { id: id },
      relations: ['productCategoryId'],
    });
  }

  async countFilteredProducts(
    product_name: string,
    product_stock: string,
    product_price: string,
    product_code: string,
    product_status: ProductStatusType,
    product_category_name: string,
  ): Promise<number> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productCategoryId', 'productCategory');

    if (product_name) {
      query.andWhere('product.product_name LIKE :product_name', {
        product_name: `%${product_name}%`,
      });
    }

    if (product_stock) {
      query.andWhere('product.product_stock LIKE :product_stock', {
        product_stock: `%${product_stock}%`,
      });
    }

    if (product_price) {
      query.andWhere('product.product_price LIKE :product_price', {
        product_price: `%${product_price}%`,
      });
    }

    if (product_code) {
      query.andWhere('product.product_code LIKE :product_code', {
        product_code: `%${product_code}%`,
      });
    }

    if (product_status) {
      query.andWhere('product.product_status LIKE :product_status', {
        product_status: `%${product_status}%`,
      });
    }

    if (product_category_name) {
      query.andWhere(
        'productCategory.product_category_name LIKE :product_category_name',
        {
          product_category_name: `%${product_category_name}%`,
        },
      );
    }

    return query.getCount();
  }

  async searchProducts(
    skip: number,
    take: number,
    product_name: string,
    product_stock: string,
    product_price: string,
    product_code: string,
    product_status: ProductStatusType,
    product_category_name: string,
  ): Promise<Products[]> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productCategoryId', 'productCategory')
      .skip(skip)
      .take(take);

    if (product_name) {
      query.where('product.product_name LIKE :product_name', {
        product_name: `%${product_name}%`,
      });
    }

    if (product_stock) {
      query.where('product.product_stock LIKE :product_stock', {
        product_stock: `%${product_stock}%`,
      });
    }

    if (product_price) {
      query.where('product.product_price LIKE :product_price', {
        product_price: `%${product_price}%`,
      });
    }

    if (product_code) {
      query.where('product.product_code LIKE :product_code', {
        product_code: `%${product_code}%`,
      });
    }

    if (product_status) {
      query.where('product.product_status LIKE :product_status', {
        product_status: `%${product_status}%`,
      });
    }

    if (product_category_name) {
      query.where(
        'productCategory.product_category_name LIKE :product_category_name',
        {
          product_category_name: `%${product_category_name}%`,
        },
      );
    }

    return query.getMany();
  }
}
