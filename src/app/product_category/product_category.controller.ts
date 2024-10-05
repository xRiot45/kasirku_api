import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import {
  ProductCategoryRequestDto,
  ProductCategoryResponseDto,
} from './dtos/product_category.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

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

  @Get('/all')
  @UseGuards(AdminGuard, AuthGuard)
  async findAllProductCategoryController(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<IBaseResponse<ProductCategoryResponseDto[]>> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.productCategoryService.findAllProductCategoryService(
      pageNumber,
      limitNumber,
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
