import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from '@prisma/client';
import { UserSchema } from 'src/users/_utils/user.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(protected reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return (super.canActivate(context) as any).then((x: UserSchema) => {
      if (!x) return x;
      const roles = this.reflector.get<RoleEnum>('roles', context.getHandler());
      if (!roles || !roles.length) return x;
      const request = context.switchToHttp().getRequest();
      return roles.includes(request.user.role);
    });
  }
}
