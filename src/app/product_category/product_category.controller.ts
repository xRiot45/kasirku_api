import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import {
  ProductCategoryRequestDto,
  ProductCategoryResponseDto,
  SearchProductCategoryDto,
} from './dtos/product_category.dto';
import { ProductCategoryService } from './product_category.service';

@Controller('/api/product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post('/create')
  @UseGuards(AdminGuard, AuthGuard)
  async createProductCategoryController(
    @Body() request: ProductCategoryRequestDto,
  ) {
    return this.productCategoryService.createProductCategoryService(request);
  }

  @Get()
  @UseGuards(AdminGuard, AuthGuard)
  async findAllProductCategoryController(
    @Query() query: SearchProductCategoryDto,
  ): Promise<IBaseResponse<ProductCategoryResponseDto[]>> {
    const { page, limit, product_category_name } = query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.productCategoryService.findAllProductCategoryService(
      pageNumber,
      limitNumber,
      product_category_name,
    );
  }

  @Get('/show/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async findProductCategoryByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<ProductCategoryResponseDto>> {
    return this.productCategoryService.findProductCategoryByIdService(id);
  }

  @Put('/update/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async updateProductCategoryController(
    @Param('id') id: string,
    @Body() request: ProductCategoryRequestDto,
  ): Promise<IBaseResponse<ProductCategoryResponseDto>> {
    return this.productCategoryService.updateProductCategoryService(
      id,
      request,
    );
  }

  @Delete('/delete/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async deleteProductCategoryController(
    @Param('id') id: string,
  ): Promise<WebResponse> {
    return this.productCategoryService.deleteProductCategoryService(id);
  }
}
