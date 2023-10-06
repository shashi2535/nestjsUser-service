import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        host: 'localhost',
        port: '3002',
        package: 'user',
        protoPath: join(__dirname, '../src/proto/user.proto'),
        loaders: {
          enums: String,
          objects: true,
          arrays: true,
        },
      },
    } as GrpcOptions,
  );
  app.listen();
}
bootstrap();
