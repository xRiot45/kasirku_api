import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import {
  DeleteUserRequestDto,
  GetUserResponse,
  SearchUsersDto,
} from './dtos/users.dto';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async findUserController(
    @AuthDecorator() userPayload: { id: string },
  ): Promise<IBaseResponse<GetUserResponse>> {
    return this.usersService.findUserService(userPayload);
  }

  @Get('/all')
  @UseGuards(AuthGuard, AdminGuard)
  async findAllUsersController(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<IBaseResponse<GetUserResponse[]>> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.usersService.findAllUsersService(pageNumber, limitNumber);
  }

  @Get('/show/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async findUserByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<GetUserResponse>> {
    return this.usersService.findUserByIdService(id);
  }

  @Get('/search')
  @UseGuards(AuthGuard, AdminGuard)
  async searchUsersController(
    @Query() query: SearchUsersDto,
  ): Promise<IBaseResponse<GetUserResponse[]>> {
    const {
      page,
      limit,
      full_name,
      email,
      employee_number,
      gender,
      role_name,
    } = query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.usersService.searchUsersService(
      pageNumber,
      limitNumber,
      full_name,
      email,
      role_name,
      employee_number,
      gender,
    );
  }

  @Put('/reset-password/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async resetPasswordController(@Param('id') id: string): Promise<WebResponse> {
    return this.usersService.resetPasswordService(id);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteUserController(
    @Param('id') id: string,
    @Body() request: DeleteUserRequestDto,
  ): Promise<WebResponse> {
    return this.usersService.deleteUser(id, request);
  }
}
