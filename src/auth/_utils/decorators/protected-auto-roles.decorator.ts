import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { RoleEnum } from '@prisma/client';

export function ProtectedAutoRolesDecorator(...roles: RoleEnum[]): any {
  return (target: any, key: any, descriptor: PropertyDescriptor) => {
    const current =
      Reflect.getMetadata(DECORATORS.API_OPERATION, descriptor.value) || {};
    const rolesSummary =
      roles.length > 0 ? `Roles: ${roles.join(', ')}` : 'ALL';
    current.summary += ` - ${rolesSummary}`;
    Reflect.defineMetadata(DECORATORS.API_OPERATION, current, descriptor.value);
  };
}
