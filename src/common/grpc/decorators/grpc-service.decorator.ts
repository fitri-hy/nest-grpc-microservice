import { SetMetadata } from '@nestjs/common';

export const GRPC_SERVICE = 'GRPC_SERVICE';

export function GrpcService(serviceName: string): ClassDecorator {
  return (target: any) => {
    SetMetadata(GRPC_SERVICE, serviceName)(target);
  };
}
