import { Checkout } from '../entities/checkout.entity';

export interface ICheckoutRepository {
  checkoutOrders(data: Checkout[]): Promise<Checkout[]>;
  findAllCheckouts(): Promise<Checkout[]>;
}
