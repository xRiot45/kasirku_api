import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { imageFileFilter, imageFileName } from 'src/common/utils/fileUploads';
import {
  ChangePasswordRequestDto,
  GetUserResponse,
  SearchUsersDto,
  UpdateProfileRequestDto,
} from './dtos/users.dto';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

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

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  async findAllUsersController(
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

    return this.usersService.findAllUsersService(
      pageNumber,
      limitNumber,
      full_name,
      email,
      role_name,
      employee_number,
      gender,
    );
  }

  @Get('/show/:id')
  @UseGuards(AdminGuard, AuthGuard)
  async findUserByIdController(
    @Param('id') id: string,
  ): Promise<IBaseResponse<GetUserResponse>> {
    return this.usersService.findUserByIdService(id);
  }

  @Put('/reset-password/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async resetPasswordController(@Param('id') id: string): Promise<WebResponse> {
    return this.usersService.resetPasswordService(id);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteUserController(@Param('id') id: string): Promise<WebResponse> {
    return this.usersService.deleteUserService(id);
  }

  @Patch('/update-profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: imageFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateUserController(
    @AuthDecorator() authenticatedUser: Users,
    @Body() request: UpdateProfileRequestDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<IBaseResponse<GetUserResponse>> {
    const updateProfile = {
      ...request,
      photo: files.find((file) => file.fieldname === 'photo'),
    };
    return this.usersService.updateProfileService(
      authenticatedUser.id,
      updateProfile,
    );
  }

  @Put('/change-password')
  @UseGuards(AuthGuard)
  async changePasswordController(
    @UserDecorator() authenticatedUser: Users,
    @Body() request: ChangePasswordRequestDto,
  ): Promise<WebResponse> {
    return this.usersService.changePasswordService(
      authenticatedUser.id,
      request,
    );
  }
}
