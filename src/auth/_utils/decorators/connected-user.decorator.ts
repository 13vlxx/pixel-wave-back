import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ConnectedUser = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
