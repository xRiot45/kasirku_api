import { IsString, MaxLength, MinLength } from 'class-validator';

export class ProductCategoryRequestDto {
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  readonly product_category_name: string;
}

export class ProductCategoryResponseDto {
  readonly id: string;
  readonly product_category_name: string;
}
