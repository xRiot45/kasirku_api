import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dtos/auth.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';

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

  @Get('/refresh-token')
  async refreshTokenController(
    @Req() request: Request,
  ): Promise<IBaseResponse<RefreshTokenResponseDto>> {
    return this.authService.refreshTokenService(request);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard)
  async logoutUserController(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<WebResponse> {
    return this.authService.logoutUserService(request, response);
  }
}
