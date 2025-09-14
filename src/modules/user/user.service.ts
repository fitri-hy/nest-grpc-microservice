import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../infrastructure/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async ListUsers(_: any) {
    return { users: this.db.findAllUsers() };
  }

  async FindUser({ id }: { id: number }) {
    return this.db.findUserById(id);
  }

  async CreateUser({ id, name }: { id: number; name: string }) {
    const user = { id, name };
    this.db.createUser(user);
    return user;
  }
}
