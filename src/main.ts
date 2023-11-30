import { NestFactory } from '@nestjs/core';
import { CbrModule } from './cbr/cbr.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { dirname, join } from 'path';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CbrModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.SERVER_ADDRESS + ':' + process.env.SERVER_PORT,
      protoPath: join(dirname(__filename), '/proto/cbr.proto'),
      package: 'cbr',
    }    
  });
  await app.listen();
}
bootstrap();
