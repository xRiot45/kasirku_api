import { ProductCategory } from 'src/app/product_category/entities/product_category.entity';
import { ProductStatusType } from 'src/common/enums/product-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  product_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  product_code: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  product_stock: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  product_price: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  product_description: string;

  @Column({
    type: 'json',
    nullable: false,
  })
  product_variants: { variant: string }[];

  @Column({
    type: 'json',
    nullable: false,
  })
  product_photos: string[];

  @Column({
    type: 'enum',
    enum: ProductStatusType,
    default: ProductStatusType.AVAILABLE,
  })
  product_status: ProductStatusType;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.product_category_name,
  )
  @JoinColumn({ name: 'productCategoryId' })
  productCategoryId: ProductCategory;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  constructor(partial: Partial<Products>) {
    Object.assign(this, partial);
  }
}
