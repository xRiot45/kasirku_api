import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { GetUserResponse } from './dto/users.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
