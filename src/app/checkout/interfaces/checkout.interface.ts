import { OrderStatusType } from 'src/common/enums/order-status.enum';
import { Checkout } from '../entities/checkout.entity';

export interface ICheckoutRepository {
  checkoutOrders(data: Checkout[]): Promise<Checkout[]>;
  findAllCheckouts(): Promise<Checkout[]>;
  findCheckoutById(id: string): Promise<Checkout>;
  changeOrderStatusToConfirmed(id: string): Promise<void>;
  changeOrderStatusToProcessed(id: string): Promise<void>;
  changeOrderStatusToCompleted(id: string): Promise<void>;
  changeOrderStatusToCancelled(id: string): Promise<void>;
  filterCheckouts(orderStatus: OrderStatusType): Promise<Checkout[]>;
}
