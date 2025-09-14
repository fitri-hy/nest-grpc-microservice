import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { promisify } from 'util';

// Proto paths
const USER_PROTO_PATH = path.join(__dirname, '../proto/user.proto');
const ORDER_PROTO_PATH = path.join(__dirname, '../proto/order.proto');

// Load proto files
const userPackageDef = protoLoader.loadSync(USER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const orderPackageDef = protoLoader.loadSync(ORDER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(userPackageDef) as any;
const orderProto = grpc.loadPackageDefinition(orderPackageDef) as any;

// gRPC clients
const userClient = new userProto.user.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);
const orderClient = new orderProto.order.OrderService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Promisify gRPC methods
const listUsers = promisify(userClient.ListUsers.bind(userClient));
const findUser = promisify(userClient.FindUser.bind(userClient));
const createUser = promisify(userClient.CreateUser.bind(userClient));

const listOrders = promisify(orderClient.ListOrders.bind(orderClient));
const findOrder = promisify(orderClient.FindOrder.bind(orderClient));
const createOrder = promisify(orderClient.CreateOrder.bind(orderClient));

// Utility to create metadata
function getMetadata(token: string) {
  const meta = new grpc.Metadata();
  meta.add('authorization', `Bearer ${token}`);
  return meta;
}

async function main() {
  const validMeta = getMetadata('valid-token');
  const invalidMeta = getMetadata('wrong-token');

  console.log('--- USER SERVICE ---');

  try {
    const users = await listUsers({}, validMeta);
    console.log('User ListUsers:', users);
  } catch (err: any) {
    console.error('User ListUsers Error:', err.message);
  }

  try {
    const user = await findUser({ id: 1 }, validMeta);
    console.log('User FindUser:', user);
  } catch (err: any) {
    console.error('User FindUser Error:', err.message);
  }

  try {
    const newUser = await createUser({ id: 3, name: 'Charlie ⚡' }, validMeta);
    console.log('User CreateUser:', newUser);
  } catch (err: any) {
    console.error('User CreateUser Error:', err.message);
  }

  try {
    await listUsers({}, invalidMeta);
  } catch (err: any) {
    console.error('User ListUsers Unauthorized:', err.message);
  }

  console.log('\n--- ORDER SERVICE ---');

  try {
    const orders = await listOrders({}, validMeta);
    console.log('Order ListOrders:', orders);
  } catch (err: any) {
    console.error('Order ListOrders Error:', err.message);
  }

  try {
    const order = await findOrder({ id: 1 }, validMeta);
    console.log('Order FindOrder:', order);
  } catch (err: any) {
    console.error('Order FindOrder Error:', err.message);
  }

  try {
    const newOrder = await createOrder({ id: 3, userId: 1, item: 'Keyboard' }, validMeta);
    console.log('Order CreateOrder:', newOrder);
  } catch (err: any) {
    console.error('Order CreateOrder Error:', err.message);
  }

  try {
    await listOrders({}, invalidMeta);
  } catch (err: any) {
    console.error('Order ListOrders Unauthorized:', err.message);
  }
}

main();
