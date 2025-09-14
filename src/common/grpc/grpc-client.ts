import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';

export function createGrpcClient(protoFile: string, servicePath: string, url: string) {
  const PROTO_PATH = join(process.cwd(), protoFile);
  const packageDef = protoLoader.loadSync(PROTO_PATH);
  const grpcObj = grpc.loadPackageDefinition(packageDef) as any;

  const [pkg, serviceName] = servicePath.split('.');
  return new grpcObj[pkg][serviceName](url, grpc.credentials.createInsecure());
}
