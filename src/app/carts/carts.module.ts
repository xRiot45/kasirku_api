import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Carts } from './entities/carts.entity';
import { CartsRepository } from './repositories/carts.repository';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carts, Products])],
  controllers: [CartsController],
  providers: [
    {
      provide: 'ICartsRepository',
      useClass: CartsRepository,
    },
    CartsService,
    JwtService,
  ],
})
export class CartsModule {}
