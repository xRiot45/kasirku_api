import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../product_category/entities/product_category.entity';
import { Products } from './entities/products.entity';
import { ProductsRepository } from './repositories/products.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductCategory])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductsRepository',
      useClass: ProductsRepository,
    },
    ProductService,
    JwtService,
  ],
})
export class ProductModule {}
