import { ProductCategory } from 'src/app/product_category/entities/product_category.entity';
import { Products } from '../entities/products.entity';
import { DeleteResult } from 'typeorm';
import { ProductStatusType } from 'src/common/enums/product-status.enum';

export interface IProductsRepository {
  createProduct(data: Products): Promise<Products>;
  findProductName(productName: string): Promise<Products | undefined>;
  findProductCategoryId(id: string): Promise<ProductCategory | undefined>;
  deleteProduct(id: string): Promise<DeleteResult>;
  findById(id: string): Promise<Products | undefined>;
  findAllProduct(skip: number, take: number): Promise<Products[]>;
  countProducts(): Promise<number>;
  updateProduct(id: string, data: Products): Promise<Products>;
  countFilteredProducts(
    product_name: string,
    product_stock: string,
    product_price: string,
    product_code: string,
    product_status: ProductStatusType,
    productCategoryId: string,
  ): Promise<number>;

  searchProducts(
    skip: number,
    take: number,
    product_name: string,
    product_stock: string,
    product_price: string,
    product_code: string,
    product_status: ProductStatusType,
    product_category_name: string,
  ): Promise<Products[]>;
}
