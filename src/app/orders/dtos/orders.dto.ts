import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class OrdersRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @IsString()
  @IsNotEmpty()
  readonly selected_variant: string;

  @IsInt()
  @IsNotEmpty()
  readonly quantity: number;

  @IsInt()
  @IsNotEmpty()
  readonly total_price: number;
}

export class OrdersReponseDto {
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
  readonly total_price: number;
}

// export class OrdersReponseDto {
//   [key: string]: OrderReponseDto;
// }
