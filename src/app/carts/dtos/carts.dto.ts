import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CartsRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly productId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly selected_variant: string;

  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;
}

export class CartsResponseDto {
  readonly id: string;
  readonly product: {
    readonly id: string;
    readonly product_name: string;
    readonly product_code: string;
    readonly product_price: number;
    readonly product_photo: string;
    readonly product_category: {
      readonly id: string;
      readonly product_category_name: string;
    };
  };
  readonly selected_variant: string;
  readonly quantity: number;
}
