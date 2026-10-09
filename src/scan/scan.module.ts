
import { Module } from '@nestjs/common';
import { HttpClientModule } from '@nestjs/http-client';
import { ScanService } from './scan.service.js';
import { ReviewsModule } from '../reviews/reviews.module.js';
import { ConfigModule , ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpClientModule.registerAsync({
      name: 'places',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        baseUrl: 'https://places.googleapis.com/v1',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': config.getOrThrow<string>('PLACES_API_KEY'),
        },
      }),
    }),
    HttpClientModule.registerAsync({
      name: 'upc',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        baseUrl: 'https://go-upc.com/api/v1/code',
        headers:  { authorization: `Bearer ${config.getOrThrow<string>('UPC_API_KEY')}` },
      }),
    }),
    ReviewsModule
  ],
  providers: [ScanService],
})
export class ScanModule {}