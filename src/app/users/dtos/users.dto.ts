import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
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

export class UpdateProfileRequestDto {
  @IsString()
  @IsOptional()
  readonly full_name?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('-');
    return new Date(`${year}-${month}-${day}`);
  })
  readonly birthday_date?: Date;

  @IsString()
  @IsOptional()
  readonly place_of_birth?: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  readonly phone_number?: string;

  @IsEnum(GenderType, {
    message:
      'gender must be one of the following: ' +
      Object.values(GenderType).join(', '),
  })
  @IsOptional()
  readonly gender?: GenderType;

  @IsString()
  @IsOptional()
  readonly address?: string;

  @IsString()
  @IsOptional()
  readonly photo?: Express.Multer.File;
}

export class UpdateProfileByAdminRequestDto {
  @IsString()
  @IsOptional()
  readonly full_name?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('-');
    return new Date(`${year}-${month}-${day}`);
  })
  readonly birthday_date?: Date;

  @IsString()
  @IsOptional()
  readonly place_of_birth?: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  readonly phone_number?: string;

  @IsEnum(GenderType, {
    message:
      'gender must be one of the following: ' +
      Object.values(GenderType).join(', '),
  })
  @IsOptional()
  readonly gender?: GenderType;

  @IsString()
  @IsOptional()
  readonly address?: string;

  @IsString()
  @IsOptional()
  readonly photo?: Express.Multer.File;

  @IsString()
  @IsOptional()
  readonly roleId: string;
}

export class ChangePasswordRequestDto {
  @IsEmail()
  @MinLength(3, { message: 'The email must be at least 3 characters long' })
  @MaxLength(100, { message: 'The email must be at most 100 characters long' })
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  @MaxLength(100, {
    message: 'The password must be at most 100 characters long',
  })
  @IsNotEmpty()
  readonly old_password: string;

  @IsString()
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  @MaxLength(100, {
    message: 'The password must be at most 100 characters long',
  })
  @IsNotEmpty()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/, {
    message:
      'New password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  readonly new_password: string;

  @IsString()
  @MinLength(6, {
    message: 'Confirm password must be at least 6 characters long.',
  })
  @MaxLength(100, {
    message: 'Confirm password must be at most 100 characters long.',
  })
  @IsNotEmpty()
  readonly confirm_password: string;
}
