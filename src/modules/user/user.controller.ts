import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../common/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  listUsers() {
    return this.userService.ListUsers({});
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.FindUser({ id: +id });
  }

  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() body: { id: number; name: string }) {
    return this.userService.CreateUser(body);
  }
}
