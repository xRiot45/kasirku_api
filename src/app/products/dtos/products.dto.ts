import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProductStatusType } from 'src/common/enums/product-status.enum';

class ProductVariantDto {
  @IsString()
  @IsNotEmpty()
  variant: string;
}

export class CreateProductRequestDto {
  @IsString()
  @MinLength(1, {
    message: 'The product name must be at least 1 character long',
  })
  @MaxLength(255, {
    message: 'The product name must be at most 255 characters long',
  })
  @IsNotEmpty()
  readonly product_name: string;

  @IsString()
  @IsNotEmpty()
  readonly product_stock: string;

  @IsString()
  @IsNotEmpty()
  readonly product_price: string;

  @IsString()
  @IsNotEmpty()
  readonly product_description: string;

  @IsArray()
  @Type(() => ProductVariantDto)
  readonly product_variants: string[];

  @IsString()
  @IsOptional()
  readonly product_photo?: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  readonly productCategoryId: string;
}

export class UpdateProductRequestDto {
  @IsString()
  @MinLength(1, {
    message: 'The product name must be at least 1 character long',
  })
  @MaxLength(255, {
    message: 'The product name must be at most 255 characters long',
  })
  @IsOptional()
  readonly product_name: string;

  @IsString()
  @IsOptional()
  readonly product_stock: string;

  @IsString()
  @IsOptional()
  readonly product_price: string;

  @IsString()
  @IsOptional()
  readonly product_description: string;

  @IsString()
  @IsOptional()
  readonly product_status: ProductStatusType;

  @IsArray()
  @Type(() => ProductVariantDto)
  @IsOptional()
  readonly product_variants: string[];

  @IsString()
  @IsOptional()
  readonly product_photo?: Express.Multer.File;

  @IsString()
  @IsOptional()
  readonly productCategoryId: string;
}

export class SearchProductDto {
  @IsOptional()
  @IsNumberString()
  readonly page: string = '1';

  @IsOptional()
  @IsNumberString()
  readonly limit: string = '10';

  @IsOptional()
  @IsString()
  readonly product_name?: string;

  @IsOptional()
  @IsString()
  readonly product_stock?: string;

  @IsOptional()
  @IsString()
  readonly product_price?: string;

  @IsOptional()
  @IsString()
  readonly product_code?: string;

  @IsOptional()
  @IsString()
  readonly product_status?: ProductStatusType;

  @IsOptional()
  @IsString()
  readonly product_category_name?: string;
}

export class ProductResponseDto {
  readonly id: string;
  readonly product_name: string;
  readonly product_code: string;
  readonly product_stock: number;
  readonly product_price: number;
  readonly product_description: string;
  readonly product_variants: ProductVariantDto[];
  readonly product_photo: string;
  readonly product_status: ProductStatusType;
  readonly product_category: {
    readonly id: string;
    readonly product_category_name: string;
  };
}
