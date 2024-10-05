import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { ProductCategoryRepository } from './repositories/product_category.repository';
import { JwtService } from '@nestjs/jwt';
import { ProductCategory } from './entities/product_category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductCategoryController],
  providers: [
    {
      provide: 'IProductCategoryRepository',
      useClass: ProductCategoryRepository,
    },
    ProductCategoryService,
    JwtService,
  ],
})
export class ProductCategoryModule {}
