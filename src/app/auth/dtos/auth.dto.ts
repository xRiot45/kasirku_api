import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequestDto {
  @MinLength(3)
  @MaxLength(100)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(6)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  readonly full_name: string;

  @IsString()
  @IsNotEmpty()
  readonly roleId: string;
}

export class RegisterResponseDto {
  readonly id: string;
  readonly full_name: string;
  readonly email: string;
  readonly employee_number: string;
  readonly role: {
    id: string;
    role_name: string;
  };
}
