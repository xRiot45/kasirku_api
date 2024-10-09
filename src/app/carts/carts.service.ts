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
    request: CartsRequestDto,
  ): Promise<IBaseResponse<CartsResponseDto>> {
    const { productId, selected_variant, quantity } = request;
    try {
      const product = await this.cartsRepository.findProductById(productId);
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

      if (quantity <= 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: 'Quantity must be greater than zero',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const productVariant = product.product_variants.find(
        (variant) => variant.variant === selected_variant,
      );

      if (!productVariant) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: 'Product variant not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const payload = {
        productId: product,
        selectedVariant: productVariant.variant,
        quantity,
      };

      const cart = new Carts(payload);
      const createdCart = await this.cartsRepository.addProductToCart(cart);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Product added to cart',
        data: {
          id: createdCart.id,
          product: {
            id: createdCart.productId.id,
            product_name: createdCart.productId.product_name,
            product_code: createdCart.productId.product_code,
            product_price: Number(createdCart.productId.product_price),
            product_category: {
              id: createdCart.productId.productCategoryId.id,
              product_category_name:
                createdCart.productId.productCategoryId.product_category_name,
            },
          },
          selected_variant: createdCart.selected_variant,
          quantity: createdCart.quantity,
        },
      };
    } catch (error) {
      throw error;
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
