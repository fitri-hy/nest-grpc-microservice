import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderGrpcController } from './order.grpc.controller';
import { DatabaseService } from '../../infrastructure/database.service';

@Module({
  controllers: [OrderGrpcController],
  providers: [OrderService, DatabaseService],
})
export class OrderModule {}
