import { Module } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class CommonModule {}
