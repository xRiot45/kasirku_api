import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CartsRequestDto, CartsResponseDto } from './dtos/carts.dto';
import { Carts } from './entities/carts.entity';
import { ICartsRepository } from './interfaces/carts.interface';

@Injectable()
export class CartsService {
  constructor(
    @Inject('ICartsRepository')
    private readonly cartsRepository: ICartsRepository,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async addProductToCartService(
    reqeust: CartsRequestDto,
  ): Promise<IBaseResponse<CartsResponseDto>> {
    const { productId, selected_variant, quantity } = reqeust;
    try {
      const product = await this.cartsRepository.findProductById(productId);
      if (!product) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Fount',
            message: 'Product Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const productQuantityCanNotBeZero = quantity <= 0;
      if (productQuantityCanNotBeZero) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Fount',
            message: 'Product Quantity Can Not Be Zero',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const productVariant = product.product_variants.find(
        (variant) => variant.variant === selected_variant,
      );

      if (!productVariant) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Fount',
            message: 'Product Variant Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const payload = {
        productId: product,
        selected_variant: productVariant.variant,
        quantity,
      };

      const cart = new Carts(payload);
      const addProduct = await this.cartsRepository.addProductToCart(cart);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Product Added To Cart',
        data: {
          id: addProduct.id,
          product: {
            id: addProduct.productId.id,
            product_name: addProduct.productId.product_name,
            product_code: addProduct.productId.product_code,
            product_price: Number(addProduct.productId.product_price),
            product_category: {
              id: addProduct.productId.productCategoryId.id,
              product_category_name:
                addProduct.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: addProduct.selected_variant,
          quantity: addProduct.quantity,
        },
      };
    } catch (error) {
      this.logger.error(`Error add product to cart: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Error add product to cart: ${error.message}`);
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

  async findAllProductsInCartService(): Promise<
    IBaseResponse<CartsResponseDto[]>
  > {
    try {
      const carts = await this.cartsRepository.findAllProductsInCart();
      if (!carts) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Carts Is Empty',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Find all products in cart successfully',
        data: carts.map((cart) => ({
          id: cart.id,
          product: {
            id: cart.productId.id,
            product_name: cart.productId.product_name,
            product_code: cart.productId.product_code,
            product_price: Number(cart.productId.product_price),
            product_category: {
              id: cart.productId.productCategoryId.id,
              product_category_name:
                cart.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: cart.selected_variant,
          quantity: cart.quantity,
        })),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`Error find all products in cart: ${error.message}`);
        throw error;
      }

      this.logger.error(`Error find all products in cart: ${error.message}`);
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
