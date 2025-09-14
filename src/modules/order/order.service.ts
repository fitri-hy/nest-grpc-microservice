import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../infrastructure/database.service';

@Injectable()
export class OrderService {
  constructor(private readonly db: DatabaseService) {}

  async ListOrders(_: any) {
    return { orders: this.db.findAllOrders() };
  }

  async FindOrder({ id }: { id: number }) {
    return this.db.findOrderById(id);
  }

  async CreateOrder({ id, userId, item }: { id: number; userId: number; item: string }) {
    const order = { id, userId, item };
    this.db.createOrder(order);
    return order;
  }
}
