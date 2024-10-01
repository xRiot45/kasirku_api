import { AppModule } from './app/app.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { Global, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { logger } from './configs/logger.config';
import * as config from 'src/configs/environment.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => config] }),
    ThrottlerModule.forRoot([
      {
        // 10 requests per minute
        ttl: 60,
        limit: 10,
      },
      {
        // 100 requests per hour
        ttl: 3600,
        limit: 100,
      },
      {
        // 1000 requests per day
        ttl: 86400,
        limit: 1000,
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
