import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
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
  readonly product_variants: ProductVariantDto[];

  @Type(() => ProductPhotoDto)
  readonly product_photos: ProductPhotoDto[];

  @IsString()
  @IsNotEmpty()
  readonly productCategoryId: string;
}

export class ProductResponseDto {
  readonly id: string;
  readonly product_name: string;
  readonly product_code: string;
  readonly product_stock: number;
  readonly product_price: number;
  readonly product_description: string;
  readonly product_variants: ProductVariantDto[];
  readonly product_photos: ProductPhotoDto[];
  readonly product_status: ProductStatusType;
  readonly product_category: {
    readonly id: string;
    readonly product_category_name: string;
  };
}
