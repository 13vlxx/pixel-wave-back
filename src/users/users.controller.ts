import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { UserSchema } from './_utils/user.schema';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @ApiOperation({ summary: 'Get user profile' })
  @Get('/me')
  me(@ConnectedUser() user: UserSchema) {
    return this.usersService.getProfile(user);
  }
}
