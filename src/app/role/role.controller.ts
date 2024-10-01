import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleRequestDto, RoleResponseDto } from './dto/dto';
import { RoleType } from 'src/common/enums/role.enum';

@Controller('/api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  async createRoleController(@Body() request: RoleRequestDto) {
    return this.roleService.createRoleService(request);
  }

  @Get('/all')
  async findAllRoleController(): Promise<IBaseResponse<RoleResponseDto[]>> {
    return this.roleService.findAllRoleService();
  }

  @Get('/show/:id')
  async findRoleByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<RoleResponseDto>> {
    return this.roleService.findRoleByIdService(id);
  }

  @Get('/search')
  async searchRoleController(
    @Query('role_name') roleName: RoleType,
  ): Promise<IBaseResponse<RoleResponseDto[]>> {
    return this.roleService.searchRoleService(roleName);
  }

  @Put('/update/:id')
  async updateRoleController(
    @Param('id') id: string,
    @Body() request: RoleRequestDto,
  ): Promise<IBaseResponse<RoleResponseDto>> {
    return this.roleService.updateRoleService(id, request);
  }

  @Delete('/delete/:id')
  async deleteRoleController(@Param('id') id: string): Promise<WebResponse> {
    return this.roleService.deleteRoleService(id);
  }
}
