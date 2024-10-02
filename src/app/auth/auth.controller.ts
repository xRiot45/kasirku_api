import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/auth.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUserController(
    @Body() request: RegisterRequestDto,
  ): Promise<IBaseResponse<RegisterResponseDto>> {
    return this.authService.registerUserService(request);
  }
}
