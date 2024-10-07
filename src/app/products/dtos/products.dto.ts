import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class ProductVariantDto {
  @IsString()
  variant: string;
}

class ProductPhotoDto {
  @IsString()
  @IsNotEmpty()
  filename: string;
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
  @IsNotEmpty()
  readonly product_variants: ProductVariantDto[];

  // @IsArray()
  // @IsNotEmpty()
  readonly product_photos: string[];

  @IsString()
  @IsNotEmpty()
  readonly productCategoryId: string;
}
