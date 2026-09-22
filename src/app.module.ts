import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ScanModule } from './scan/scan.module.js';
import { DBModule } from './db/db.module.js';
import { RepairLocationsModule } from './repair-locations/repair-locations.module.js';
import { CertificationsModule } from './certifications/certifications.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { QuestionsModule } from './questions/questions.module.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'treebar-back',
    }),
     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        stores: [
          new Keyv({
            store: new KeyvRedis(process.env.REDIS_URL),
          }),
        ],
        ttl: 60_000,
      }),
    }),
    ScanModule,
    ReviewsModule,
    CertificationsModule,
    RepairLocationsModule,
    DBModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
