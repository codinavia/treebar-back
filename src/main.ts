import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = 
    await NestFactory.create(AppModule);
  
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  const configService =
    app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port =
    configService.get<number>('PORT', 3000);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
  });

  await app.listen(port);
}
bootstrap();