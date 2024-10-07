import { ProductCategory } from 'src/app/product_category/entities/product_category.entity';
import { Products } from '../entities/products.entity';

export interface IProductsRepository {
  createProduct(data: Products): Promise<Products>;
  findProductName(productName: string): Promise<Products | undefined>;
  findProductCategoryId(id: string): Promise<ProductCategory | undefined>;
}
