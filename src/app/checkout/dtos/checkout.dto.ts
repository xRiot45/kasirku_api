import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CheckoutRequestDto {
  @IsNumber()
  @IsNotEmpty()
  readonly payment_amount: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  readonly seat_number: string;
}
