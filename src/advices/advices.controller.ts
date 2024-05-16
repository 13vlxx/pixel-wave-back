import { Controller, Get, Param } from '@nestjs/common';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { UserSchema } from 'src/users/_utils/user.schema';
import { AdvicesService } from './advices.service';

@Controller('advices')
export class AdvicesController {
  constructor(private readonly advicesService: AdvicesService) {}

  @Get()
  getAdvices() {
    return this.advicesService.getAdvices();
  }

  @Protect()
  @Get(':gameId/check')
  checkIfAlreadyPostedAdvice(
    @ConnectedUser() user: UserSchema,
    @Param('gameId') gameId: string,
  ) {
    return this.advicesService.checkIfAlreadyPostedAdvice(user, gameId);
  }
}
