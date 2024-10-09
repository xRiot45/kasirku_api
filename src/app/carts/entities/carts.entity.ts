import { Products } from 'src/app/products/entities/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'carts' })
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Products, (products) => products.id)
  @JoinColumn({ name: 'productId' })
  productId: Products;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  selected_variant: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  quantity: number;

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

  constructor(partial: Partial<Carts>) {
    Object.assign(this, partial);
  }
}
