import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthGuard } from '../../common/auth/auth.guard';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller()
export class OrderGrpcController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService', 'ListOrders')
  listOrders(_: any) {
    return this.orderService.ListOrders({});
  }

  @GrpcMethod('OrderService', 'FindOrder')
  findOrder(data: { id: number }) {
    return this.orderService.FindOrder(data);
  }

  @GrpcMethod('OrderService', 'CreateOrder')
  createOrder(data: { id: number; userId: number; item: string }) {
    return this.orderService.CreateOrder(data);
  }
}
