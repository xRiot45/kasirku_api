import { Orders } from '../entities/orders.entity';

export interface IOrdersRepository {
  createOrders(data: Orders): Promise<Orders>;
}
