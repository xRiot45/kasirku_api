import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { RoleType } from 'src/common/enums/role.enum';

export class RoleRequestDto {
  @IsString()
  @IsEnum(RoleType, {
    message:
      'role_name must be one of the following: ' +
      Object.values(RoleType).join(', '),
  })
  readonly role_name: RoleType;
}

export class RoleResponseDto {
  readonly id: string;
  readonly role_name: string;
}

export class SearchRoleDto {
  @IsOptional()
  @IsNumberString()
  readonly page: string = '1';

  @IsOptional()
  @IsNumberString()
  readonly limit: string = '10';

  @IsOptional()
  @IsString()
  readonly role_name?: RoleType;
}
