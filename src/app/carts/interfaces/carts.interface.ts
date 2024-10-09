import { Products } from 'src/app/products/entities/products.entity';
import { Carts } from '../entities/carts.entity';

export interface ICartsRepository {
  addProductToCart(data: Carts): Promise<Carts>;
  findProductById(id: string): Promise<Products>;
  findAllProductsInCart(): Promise<Carts[]>;
}
