import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly config = {
    grpcUrl: process.env.GRPC_URL || '0.0.0.0:50051',
    jwtSecret: process.env.JWT_SECRET || 'supersecret',
  };

  get(key: string): any {
    return this.config[key];
  }
}
