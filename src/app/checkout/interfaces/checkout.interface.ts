import { OrderStatusType } from 'src/common/enums/order-status.enum';
import { Checkout } from '../entities/checkout.entity';

export interface ICheckoutRepository {
  checkoutOrders(data: Checkout[]): Promise<Checkout[]>;
  findAllCheckouts(
    skip: number,
    take: number,
    order_status: OrderStatusType,
  ): Promise<Checkout[]>;
  findCheckoutById(id: string): Promise<Checkout>;
  changeOrderStatusToConfirmed(id: string): Promise<void>;
  changeOrderStatusToProcessed(id: string): Promise<void>;
  changeOrderStatusToCompleted(id: string): Promise<void>;
  changeOrderStatusToCancelled(id: string): Promise<void>;
  countFilteredCheckouts(order_status: OrderStatusType): Promise<number>;
  getAllDataCheckouts(): Promise<any>;
  removeCheckout(id: string): Promise<void>;
}
