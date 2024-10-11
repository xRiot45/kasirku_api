import { Checkout } from 'src/app/checkout/entities/checkout.entity';
import { Products } from 'src/app/products/entities/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Products, (products) => products.id)
  @JoinColumn({ name: 'productId' })
  productId: Products;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  selected_variant: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  quantity: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  total_price: number;

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

  @ManyToOne(() => Checkout, (checkout) => checkout.orders)
  @JoinColumn({ name: 'checkoutId' })
  nullable: true;
  checkoutId: Checkout;

  constructor(partial: Partial<Orders>) {
    Object.assign(this, partial);
  }
}
