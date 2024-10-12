import { Checkout } from '../entities/checkout.entity';

export interface ICheckoutRepository {
  checkoutOrders(data: Checkout[]): Promise<Checkout[]>;
  findAllCheckouts(): Promise<Checkout[]>;
  findCheckoutById(id: string): Promise<Checkout>;
  changeOrderStatusToProcessed(id: string): Promise<void>;
  changeOrderStatusToCompleted(id: string): Promise<void>;
  changeOrderStatusToCancelled(id: string): Promise<void>;
}
