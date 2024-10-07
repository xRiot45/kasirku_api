import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductsRepository } from './interfaces/products.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  CreateProductRequestDto,
  ProductResponseDto,
} from './dtos/products.dto';
import { generateProductCode } from 'src/common/utils/productCode.util';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductsRepository')
    private readonly productRepository: IProductsRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async createProductService(
    request: CreateProductRequestDto,
  ): Promise<IBaseResponse<ProductResponseDto>> {
    const {
      product_name,
      product_stock,
      product_price,
      product_description,
      product_variants,
      product_photos,
      productCategoryId,
    } = request;

    try {
      const productExist =
        await this.productRepository.findProductName(product_name);
      if (productExist && productExist.id) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: 'Conflict',
            message: 'Product already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      const productCategory =
        await this.productRepository.findProductCategoryId(productCategoryId);

      if (!productCategory) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Product category Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const productCode = generateProductCode();
      const photoProductPaths = [];
      if (product_photos) {
        for (const photo of product_photos) {
          photoProductPaths.push(`uploads/${photo.filename}`);
        }
      }

      const payload = {
        product_name,
        product_stock,
        product_price,
        product_code: productCode,
        product_description,
        product_variants,
        product_photos: photoProductPaths,
        productCategoryId: productCategory,
      };

      const product = new Products(payload);
      const createProduct = await this.productRepository.createProduct(product);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create product successfully',
        data: {
          id: createProduct.id,
          product_name: createProduct.product_name,
          product_code: createProduct.product_code,
          product_stock: createProduct.product_stock,
          product_price: createProduct.product_price,
          product_description: createProduct.product_description,
          product_variants: createProduct.product_variants,
          product_photos: createProduct.product_photos,
          product_status: createProduct.product_status,
          product_category: {
            id: createProduct.productCategoryId.id,
            product_category_name:
              createProduct.productCategoryId.product_category_name,
          },
        },
      };
    } catch (error) {
      this.logger.error(`Error create product: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProductService(id: string): Promise<WebResponse> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.productRepository.deleteProduct(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Error create product: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
