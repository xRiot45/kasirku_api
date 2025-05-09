import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import * as config from 'src/configs/environment.config';
import { AppModule } from './app/app.module';
import { CommonModule } from './common/common.module';
import { logger } from './configs/logger.config';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => config] }),
    ThrottlerModule.forRoot([
      {
        // 10 requests per minute
        ttl: 60,
        limit: 100,
      },
      {
        // 100 requests per hour
        ttl: 3600,
        limit: 1000,
      },
      {
        // 1000 requests per day
        ttl: 86400,
        limit: 10000,
      },
    ]),
    WinstonModule.forRoot(logger),
    AppModule,
    DatabaseModule,
    CommonModule,
  ],
  providers: [],
})
export class MainModule {}
