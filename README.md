# NestJS gRPC Microservice

NestGRPC is an early modern microservice project based on NestJS, with gRPC support and a fallback REST API.

## Key Features

- gRPC microservice with REST fallback
- Token-based authentication via AuthGuard
- Custom logger for clearer logging with emojis
- Dummy database for temporary data
- gRPC client testing for all CRUD operations
- CORS enabled for REST API

## Technologies

- **Runtime & Framework**: Node.js, NestJS, TypeScript, RxJS
- **Authentication**: Simple AuthGuard
- **Database**: Dummy in-memory database
- **Microservice Transport**: gRPC
- **Observability**: Custom logger
- **Client Testing**: gRPC client using `@grpc/grpc-js`


## Installation

```bash
pnpm install
pnpm start:dev
```

## gRPC Client Testing

```
pnpm client
```

## Folder Structure

```
nestgrpc/
│
├── proto/
│   ├── order.proto
│   └── user.proto
│
├── src/
│   │
│   ├── common/
│   │   ├── auth/
│   │   │   └── auth.guard.ts
│   │   ├── config/
│   │   │   └── config.service.ts
│   │   ├── grpc/
│   │   │   ├── decorators/
│   │   │   │   ├── grpc-service.decorator.ts
│   │   │   │   ├── grpc-method.decorator.ts
│   │   │   │   └── index.ts
│   │   │   ├── grpc-app-factory.ts
│   │   │   └── grpc-client.ts
│   │   └── logger/
│   │       └── logger.service.ts
│   │
│   ├── infrastructure/(dummy testing)
│   │    └── database.service.ts
│   │ 
│   ├── modules/
│   │   ├── order/
│   │   │   ├── order.controller.ts
│   │   │   ├── order.grpc.controller.ts
│   │   │   ├── order.module.ts
│   │   │   └── order.service.ts
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.grpc.controller.ts
│   │       ├── user.module.ts
│   │       └── user.service.ts
│   │
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
│
├── test/
│   └── client.ts
│
├── package.json
└── tsconfig.json
```
