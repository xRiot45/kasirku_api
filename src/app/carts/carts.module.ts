import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Carts } from './entities/carts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carts])],
  controllers: [CartsController],
  providers: [CartsService, JwtService],
})
export class CartsModule {}
