import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleRequestDto, RoleResponseDto, SearchRoleDto } from './dtos/dto';
import { RoleService } from './role.service';

@Controller('/api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @UseGuards(AdminGuard, AuthGuard)
  async createRoleController(@Body() request: RoleRequestDto) {
    return this.roleService.createRoleService(request);
  }

  @Get()
  @UseGuards(AdminGuard, AuthGuard)
  async findAllRoleController(
    @Query() query: SearchRoleDto,
  ): Promise<IBaseResponse<RoleResponseDto[]>> {
    const { page, limit, role_name } = query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.roleService.findAllRoleService(
      pageNumber,
      limitNumber,
      role_name,
    );
  }

  @Get('/show/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async findRoleByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<RoleResponseDto>> {
    return this.roleService.findRoleByIdService(id);
  }

  @Put('/update/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async updateRoleController(
    @Param('id') id: string,
    @Body() request: RoleRequestDto,
  ): Promise<IBaseResponse<RoleResponseDto>> {
    return this.roleService.updateRoleService(id, request);
  }

  @Delete('/delete/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async deleteRoleController(@Param('id') id: string): Promise<WebResponse> {
    return this.roleService.deleteRoleService(id);
  }
}
