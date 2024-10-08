import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { diskStorage } from 'multer';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { imageFileFilter, imageFileName } from 'src/common/utils/fileUploads';
import {
  CreateProductRequestDto,
  ProductResponseDto,
  SearchProductDto,
  UpdateProductRequestDto,
} from './dtos/products.dto';
import { ProductService } from './products.service';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(
    FilesInterceptor('product_photos', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: imageFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * 2 },
    }),
  )
  async createProductController(
    @Body() request: CreateProductRequestDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<IBaseResponse<ProductResponseDto>> {
    const productPhotosDto = files.map((file) => ({ filename: file.filename }));
    const createProduct = plainToClass(CreateProductRequestDto, {
      ...request,
      product_photos: productPhotosDto,
    });

    return this.productService.createProductService(createProduct);
  }

  @Get('/all')
  @UseGuards(AdminGuard, AuthGuard)
  async findAllProductController(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<IBaseResponse<ProductResponseDto[]>> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.productService.findAllProductService(pageNumber, limitNumber);
  }

  @Get('/show/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async findProductByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<ProductResponseDto>> {
    return this.productService.findProductByIdService(id);
  }

  @Get('/search')
  @UseGuards(AuthGuard)
  async searchProductController(
    @Query() query: SearchProductDto,
  ): Promise<IBaseResponse<ProductResponseDto[]>> {
    const {
      page,
      limit,
      product_name,
      product_stock,
      product_price,
      product_code,
      product_status,
      product_category_name,
    } = query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.productService.searchProductService(
      pageNumber,
      limitNumber,
      product_name,
      product_stock,
      product_price,
      product_code,
      product_status,
      product_category_name,
    );
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(
    FilesInterceptor('product_photos', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: imageFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * 2 },
    }),
  )
  async updateProductController(
    @Param('id') id: string,
    @Body() request: UpdateProductRequestDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<IBaseResponse<ProductResponseDto>> {
    // Cek apakah ada file yang diunggah
    const productPhotos =
      files && files.length > 0
        ? files.map((file) => ({ filename: file.filename }))
        : [];

    const updateProduct = plainToClass(UpdateProductRequestDto, {
      ...request,
      product_photos: productPhotos.length > 0 ? productPhotos : undefined,
    });

    return this.productService.updateProductService(id, updateProduct);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteProductController(@Param('id') id: string): Promise<WebResponse> {
    return this.productService.deleteProductService(id);
  }
}
