import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { UpdateProfilePictureDto } from './_utils/dtos/requests/update-profile-picture.dto';
import { UpdateSettingsDto } from './_utils/dtos/requests/update-settings.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @ApiOperation({ summary: 'Get user profile' })
  @Get('/me')
  me(@ConnectedUser() user: user) {
    return this.usersService.getMe(user);
  }

  @Get('/:targetId')
  @ApiOperation({ summary: 'Get user profile by id' })
  @ApiQuery({ name: 'currentUserId', required: false, type: String })
  getUserProfile(
    @Param('targetId') targetId: string,
    @Query('currentUserId') currentUserId?: string,
  ) {
    return this.usersService.getUserProfile(targetId, currentUserId);
  }

  @Protect()
  @HttpCode(204)
  @ApiOperation({ summary: 'Update user settings' })
  @Patch('/profile')
  updateUserProfile(
    @ConnectedUser() user: user,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.usersService.updateProfile(user, updateSettingsDto);
  }

  @Protect()
  @Patch('/profile/picture')
  @ApiOperation({ summary: 'Update user profile picture' })
  @FormDataRequest()
  updateUserProfilePicture(
    @ConnectedUser() user: user,
    @Body() updateProfilePictureDto: UpdateProfilePictureDto,
  ) {
    return this.usersService.updateProfilePicture(
      user,
      updateProfilePictureDto,
    );
  }
}
