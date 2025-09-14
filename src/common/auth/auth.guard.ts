import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const metadata = context.switchToRpc().getContext();
    const token = metadata.get('authorization')?.[0];

    if (token !== 'Bearer valid-token') {
      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: 'Token invalid, access denied',
      });
    }

    console.log('Token Accepted:', token);
    return true;
  }
}
