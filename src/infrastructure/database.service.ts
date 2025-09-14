import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  // Dummy users
  private users: { id: number; name: string }[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  // Dummy orders
  private orders: { id: number; userId: number; item: string }[] = [
    { id: 1, userId: 1, item: 'Laptop' },
    { id: 2, userId: 2, item: 'Phone' },
  ];

  // --- USER METHODS ---
  findAllUsers() {
    return this.users;
  }

  findUserById(id: number) {
    return this.users.find(u => u.id === id) || null;
  }

  createUser(user: { id: number; name: string }) {
    this.users.push(user);
    return user;
  }

  // --- ORDER METHODS ---
  findAllOrders() {
    return this.orders;
  }

  findOrderById(id: number) {
    return this.orders.find(o => o.id === id) || null;
  }

  createOrder(order: { id: number; userId: number; item: string }) {
    this.orders.push(order);
    return order;
  }
}
