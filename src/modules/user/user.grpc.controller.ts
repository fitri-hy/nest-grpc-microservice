import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthGuard } from '../../common/auth/auth.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller()
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'ListUsers')
  listUsers(_: any) {
    return this.userService.ListUsers({});
  }

  @GrpcMethod('UserService', 'FindUser')
  findUser(data: { id: number }) {
    return this.userService.FindUser(data);
  }

  @GrpcMethod('UserService', 'CreateUser')
  createUser(data: { id: number; name: string }) {
    return this.userService.CreateUser(data);
  }
}
