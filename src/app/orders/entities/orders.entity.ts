import { Products } from 'src/app/products/entities/products.entity';
import { OrderStatusType } from 'src/common/enums/order-status.enum';
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
  order_date: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  payment_amount: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  change_returned: number;

  @Column({
    type: 'enum',
    enum: OrderStatusType,
    default: OrderStatusType.CREATED,
  })
  status_order: OrderStatusType;

  @Column({
    type: 'varchar',
    nullable: true,
    default: '-',
  })
  seat_number: string;

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

  constructor(partial: Partial<Orders>) {
    Object.assign(this, partial);
  }
}
