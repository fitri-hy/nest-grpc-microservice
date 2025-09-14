import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '../config/config.service';

interface GrpcOptions {
  protoPath: string | string[];
  packageName: string | string[];
  grpcPort?: number;
}

export class GrpcAppFactory {
  static async create(module: any, options: GrpcOptions): Promise<INestApplication> {
    const app = await NestFactory.create(module, { logger: ['log', 'error', 'warn'] });
    const config = app.get(ConfigService);

    const protoPaths = Array.isArray(options.protoPath) ? options.protoPath : [options.protoPath];
    const packageNames = Array.isArray(options.packageName) ? options.packageName : [options.packageName];
    const grpcPort = options.grpcPort || 50051;

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        package: packageNames,
        protoPath: protoPaths.map(p => join(process.cwd(), p)),
        url: `0.0.0.0:${grpcPort}`,
      },
    });

    await app.startAllMicroservices();
    return app;
  }
}
