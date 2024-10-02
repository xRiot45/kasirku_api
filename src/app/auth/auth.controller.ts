import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dtos/auth.dto';
import { Response } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUserController(
    @Body() request: RegisterRequestDto,
  ): Promise<IBaseResponse<RegisterResponseDto>> {
    return this.authService.registerUserService(request);
  }

  @Post('/login')
  async loginUserController(
    @Body() request: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IBaseResponse<LoginResponseDto>> {
    return this.authService.loginUserService(request, response);
  }
}
