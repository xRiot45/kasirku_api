import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
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

  @Delete('/delete/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteProductController(@Param('id') id: string): Promise<WebResponse> {
    return this.productService.deleteProductService(id);
  }
}
