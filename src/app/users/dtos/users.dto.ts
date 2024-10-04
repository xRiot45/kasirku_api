import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { GenderType } from 'src/common/enums/gender.enum';

export class GetUserResponse {
  readonly id: string;
  readonly full_name: string;
  readonly employee_number: string;
  readonly birthday_date: Date;
  readonly place_of_birth: string;
  readonly phone_number: string;
  readonly gender: string;
  readonly address: string;
  readonly photo: string;
  readonly email: string;
  readonly role: {
    readonly id: string;
    readonly role_name: string;
  };
}

export class SearchUsersDto {
  @IsOptional()
  @IsNumberString()
  readonly page: string = '1';

  @IsOptional()
  @IsNumberString()
  readonly limit: string = '10';

  @IsOptional()
  @IsString()
  readonly full_name?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly employee_number?: string;

  @IsOptional()
  @IsEnum(GenderType)
  readonly gender?: GenderType;

  @IsOptional()
  @IsString()
  readonly role_name?: string;
}

export class DeleteUserRequestDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly employee_number: string;

  @IsString()
  readonly password: string;
}
