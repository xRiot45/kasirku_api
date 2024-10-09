import { Products } from 'src/app/products/entities/products.entity';
import { Carts } from '../entities/carts.entity';
import { DeleteResult } from 'typeorm';

export interface ICartsRepository {
  addProductToCart(data: Carts): Promise<Carts>;
  findCartById(id: string): Promise<Carts>;
  findAllProductsInCart(): Promise<Carts[]>;
  deleteCartById(id: string): Promise<DeleteResult>;
  findProductById(id: string): Promise<Products>;
  deleteAllCarts(): Promise<void>;
  findAllCarts(): Promise<Carts[]>;
}
