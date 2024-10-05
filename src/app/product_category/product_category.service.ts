import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ProductCategoryRepository } from './repositories/product_category.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  ProductCategoryRequestDto,
  ProductCategoryResponseDto,
} from './dtos/product_category.dto';
import { ProductCategory } from './entities/product_category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject('IProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async createProductCategoryService(
    request: ProductCategoryRequestDto,
  ): Promise<IBaseResponse<ProductCategoryResponseDto>> {
    const { product_category_name } = request;
    try {
      const productCategoryExist =
        await this.productCategoryRepository.findByProductCategoryName(
          product_category_name,
        );

      if (productCategoryExist) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'Conflict',
            message: 'Product Category already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      const payload = { product_category_name };
      const productCategory = new ProductCategory(payload);
      5;

      const createProductCategory =
        await this.productCategoryRepository.create(productCategory);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Product Category created successfully',
        data: {
          id: createProductCategory.id,
          product_category_name: createProductCategory.product_category_name,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error creating product category: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error creating product category: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
