import { Role } from 'src/app/role/entities/role.entity';
import { GenderType } from 'src/common/enums/gender.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  full_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  employee_number: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday_date: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  place_of_birth: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 25,
  })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: GenderType,
    nullable: true,
  })
  gender: GenderType;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  photo: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  roleId: Role;

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
  role: any;

  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}
