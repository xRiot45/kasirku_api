import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

class ProductPhotoDto {
  @IsString()
  @IsNotEmpty()
  filename: string;
}

export class CheckoutRequestDto {
  @IsNumber()
  @IsNotEmpty()
  readonly payment_amount: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  readonly seat_number: string;
}

export class CheckoutResponseDto {
  readonly id: string;
  readonly total_order_price: number;
  readonly checkout_date: Date;
  readonly payment_amount: number;
  readonly change_returned: number;
  readonly order_status: string;
  readonly payment_method: string;
  readonly seat_number: string;
  readonly orders: {
    readonly id: string;
    readonly product: {
      readonly id: string;
      readonly product_name: string;
      readonly product_code: string;
      readonly product_price: number;
      readonly product_photos: ProductPhotoDto[];
      readonly product_category: {
        readonly id: string;
        readonly product_category_name: string;
      };
    };
    readonly selected_variant: string;
    readonly quantity: number;
    readonly total_price: number;
  }[];
}
