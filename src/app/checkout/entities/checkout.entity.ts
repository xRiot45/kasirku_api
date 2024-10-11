import { Orders } from 'src/app/orders/entities/orders.entity';
import { OrderStatusType } from 'src/common/enums/order-status.enum';
import { PaymentMethodType } from 'src/common/enums/payment-method.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'checkouts' })
export class Checkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  total_order_price: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  checkout_date: Date;

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
    nullable: false,
    default: OrderStatusType.CONFIRMED,
  })
  order_status: OrderStatusType;

  @Column({
    type: 'enum',
    enum: PaymentMethodType,
    nullable: false,
    default: PaymentMethodType.CASH,
  })
  payment_method: PaymentMethodType;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 25,
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

  @OneToMany(() => Orders, (orders) => orders.checkoutId)
  orders: Orders[];

  constructor(partial: Partial<Checkout>) {
    Object.assign(this, partial);
  }
}
