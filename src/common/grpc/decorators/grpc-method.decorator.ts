import { GrpcMethod as NestGrpcMethod } from '@nestjs/microservices';

export function GrpcMethod(methodName?: string): MethodDecorator {
  return (target, key, descriptor: PropertyDescriptor) => {
    return NestGrpcMethod(methodName || key.toString())(
      target,
      key,
      descriptor,
    );
  };
}
