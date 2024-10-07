import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { diskStorage } from 'multer';
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
}
