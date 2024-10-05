import { ProductCategory } from '../entities/product_category.entity';

export interface IProductCategory {
  create(data: ProductCategory): Promise<ProductCategory>;
  findByProductCategoryName(
    product_category_name: string,
  ): Promise<ProductCategory | undefined>;
  findAllProductCategory(
    skip: number,
    take: number,
  ): Promise<ProductCategory[]>;
  countProductCategory(): Promise<number>;
  countFilteredProductCategory(product_category_name: string): Promise<number>;
  findById(id: string): Promise<ProductCategory>;
  searchProductCategory(
    skip: number,
    take: number,
    product_category_name: string,
  ): Promise<ProductCategory[]>;
  updateProductCategory(
    id: string,
    data: Partial<ProductCategory>,
  ): Promise<void>;
  deleteProductCategory(id: string): Promise<void>;
}
