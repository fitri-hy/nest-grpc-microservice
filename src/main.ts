import { AppModule } from './app.module';
import { GrpcAppFactory } from './common/grpc/grpc-app-factory';
import { AppLogger } from './common/logger/logger.service';

async function bootstrap() {
  const protoPaths = ['proto/user.proto', 'proto/order.proto'];
  const packageNames = ['user', 'order'];

  const app = await GrpcAppFactory.create(AppModule, {
    protoPath: protoPaths,
    packageName: packageNames,
    grpcPort: 50051,
  });

  const logger = app.get(AppLogger);
  app.useLogger(logger);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);

  logger.log('gRPC server running on 0.0.0.0:50051');
  logger.log('REST API running on http://localhost:3000');
}

bootstrap();
