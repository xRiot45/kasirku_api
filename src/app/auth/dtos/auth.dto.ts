import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { RoleType } from 'src/common/enums/role.enum';

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

export class LoginRequestDto {
  @MinLength(3)
  @MaxLength(100)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(8)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  readonly password: string;
}

export class LoginResponseDto {
  readonly access_token: string;
  readonly refresh_token: string;
}

export class RefreshTokenResponseDto {
  readonly access_token: string;
}
