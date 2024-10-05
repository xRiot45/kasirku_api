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

  async findAllProductCategoryService(
    page: number = 1,
    limit: number = 1,
  ): Promise<IBaseResponse<ProductCategoryResponseDto[]>> {
    try {
      const skip = (page - 1) * limit;
      const productCategories =
        await this.productCategoryRepository.findAllProductCategory(
          skip,
          limit,
        );

      const totalProductCategories =
        await this.productCategoryRepository.countProductCategory();

      const totalPages = Math.ceil(totalProductCategories / limit);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;

      return {
        statusCode: HttpStatus.OK,
        message: 'Find all product categories successfully',
        data: productCategories.map((productCategory) => ({
          id: productCategory.id,
          product_category_name: productCategory.product_category_name,
        })),
        totalItems: totalProductCategories,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(
          `Error find all product categories: ${error.message}`,
        );
        throw error;
      }

      this.logger.error(`Error find all product categories: ${error.message}`);
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

  async findProductCategoryByIdService(
    id: string,
  ): Promise<IBaseResponse<ProductCategoryResponseDto>> {
    try {
      const productCategory = await this.productCategoryRepository.findById(id);
      if (!productCategory) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Product Category not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Find product category successfully',
        data: {
          id: productCategory.id,
          product_category_name: productCategory.product_category_name,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find product category: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find product category: ${error.message}`);
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

  async updateProductCategoryService(
    id: string,
    request: ProductCategoryRequestDto,
  ): Promise<IBaseResponse<ProductCategoryResponseDto>> {
    const { product_category_name } = request;
    try {
      const productCategory = await this.productCategoryRepository.findById(id);

      if (!productCategory) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Product Category not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const productCategoryExist =
        await this.productCategoryRepository.findByProductCategoryName(
          product_category_name,
        );

      if (productCategoryExist && productCategoryExist.id !== id) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'Conflict',
            message: 'Product Category already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      await this.productCategoryRepository.updateProductCategory(id, {
        product_category_name,
      });
      const updatedProductCategory =
        await this.productCategoryRepository.findById(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Update product category successfully',
        data: {
          id: updatedProductCategory.id,
          product_category_name: updatedProductCategory.product_category_name,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error Updated product category: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error Updated product category: ${error.message}`);
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

  async deleteProductCategoryService(id: string): Promise<WebResponse> {
    try {
      const productCategory = await this.productCategoryRepository.findById(id);
      if (!productCategory) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Product Category not found or already deleted',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.productCategoryRepository.deleteProductCategory(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Product Category deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error delete product category: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error delete product category: ${error.message}`);
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
