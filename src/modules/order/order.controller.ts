import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../../common/auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  listOrders() {
    return this.orderService.ListOrders({});
  }

  @Get(':id')
  findOrder(@Param('id') id: number) {
    return this.orderService.FindOrder({ id: +id });
  }

  @UseGuards(AuthGuard)
  @Post()
  createOrder(@Body() body: { id: number; userId: number; item: string }) {
    return this.orderService.CreateOrder(body);
  }
}
