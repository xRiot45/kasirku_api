import { DeleteResult } from 'typeorm';
import { Orders } from '../entities/orders.entity';

export interface IOrdersRepository {
  createOrders(data: Orders[]): Promise<Orders[]>;
  findAllOrders(): Promise<Orders[]>;
  findOrderById(id: string): Promise<Orders>;
  deleteOrder(id: string): Promise<DeleteResult>;
  deleteAllOrders(): Promise<void>;
  findAllUncheckedOrders(): Promise<Orders[]>;
  save(data: Orders[]): Promise<Orders[]>;
}
