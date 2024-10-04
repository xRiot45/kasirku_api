import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { GetUserResponse } from './dto/users.dto';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { GenderType } from 'src/common/enums/gender.enum';

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
    return this.usersService.findAllUsers(pageNumber, limitNumber);
  }

  @Get('/search')
  @UseGuards(AuthGuard, AdminGuard)
  async searchUsersController(
    @Query('page') pageNumber: string = '1',
    @Query('limit') limitNumber: string = '10',
    @Query('full_name') fullName: string,
    @Query('email') email: string,
    @Query('employee_number') employeeNumber: string,
    @Query('gender') gender: GenderType,
    @Query('role_name') roleName: string,
  ): Promise<IBaseResponse<GetUserResponse[]>> {
    return this.usersService.searchUsersService(
      parseInt(pageNumber, 10),
      parseInt(limitNumber, 10),
      fullName,
      email,
      roleName,
      employeeNumber,
      gender,
    );
  }

  @Put('/reset-password/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async resetPasswordController(@Param('id') id: string): Promise<WebResponse> {
    return this.usersService.resetPassword(id);
  }
}
