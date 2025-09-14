import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGrpcController } from './user.grpc.controller';
import { UserController } from './user.controller';
import { DatabaseService } from '../../infrastructure/database.service';

@Module({
  controllers: [UserGrpcController, UserController],
  providers: [UserService, DatabaseService],
})
export class UserModule {}
