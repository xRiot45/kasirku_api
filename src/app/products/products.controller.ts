import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductRequestDto } from './dtos/products.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { imageFileFilter, imageFileName } from 'src/common/utils/fileUploads';
import { plainToClass } from 'class-transformer';
import { extname } from 'path';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @UseInterceptors(
    FilesInterceptor('product_photos', 10, {
      storage: diskStorage({
        destination: './uploads', // Folder untuk menyimpan file
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createProductController(
    @Body() request: CreateProductRequestDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    const productPhotosDto = files.map((file) => ({ filename: file.filename }));
    const createProduct = plainToClass(CreateProductRequestDto, {
      ...request,
      product_photos: productPhotosDto,
    });

    return this.productService.createProductService(createProduct);
  }
}
