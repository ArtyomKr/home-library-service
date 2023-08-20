import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { LoggingService } from './logger/logger.service';

dotenv.config();
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth({ in: 'header', type: 'http' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggingService));
  await app.listen(port);
  console.log(`Server is running on https: http://localhost:${port}/`);
}

bootstrap();

process
  .on('unhandledRejection', (reason, promise) => {
    const logger = new LoggingService();
    logger.error(reason, 'Unhandled Rejection at Promise', promise);
  })
  .on('uncaughtException', (err) => {
    const logger = new LoggingService();
    logger.error(err, 'Uncaught Exception');
  });
