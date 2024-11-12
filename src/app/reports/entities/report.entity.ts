import { OrderStatusType } from 'src/common/enums/order-status.enum';
import { PaymentMethodType } from 'src/common/enums/payment-method.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reports' })
export class Reports {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  reporting_date: Date;

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

  @Column({
    type: 'varchar',
    nullable: false,
  })
  invoice: string;

  @Column({
    type: 'json',
    nullable: false,
  })
  orders: JSON;

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

  constructor(partial: Partial<Reports>) {
    Object.assign(this, partial);
  }
}
