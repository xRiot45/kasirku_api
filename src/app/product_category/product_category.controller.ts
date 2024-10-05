import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryRequestDto } from './dtos/product_category.dto';

@Controller('/api/product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post('/create')
  async createProductCategoryController(
    @Body() request: ProductCategoryRequestDto,
  ) {
    return this.productCategoryService.createProductCategoryService(request);
  }
}
