import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ReportsResponseDto {
  readonly id: string;
  readonly invoice: string;
  readonly reporting_date: Date;
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
      readonly product_photo: string;
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

export class ReportsResponseByIdDto {
  readonly id: string;
  readonly invoice: string;
  readonly reporting_date: Date;
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
      readonly product_photo: string;
      readonly product_category: {
        readonly id: string;
        readonly product_category_name: string;
      };
    };
    readonly selected_variant: string;
    readonly quantity: number;
    readonly total_price: number;
  };
}

export class SearchReports {
  @IsOptional()
  @IsNumberString()
  readonly page: string = '1';

  @IsOptional()
  @IsNumberString()
  readonly limit: string = '10';

  @IsOptional()
  @IsString()
  readonly reporting_date: string;
}
