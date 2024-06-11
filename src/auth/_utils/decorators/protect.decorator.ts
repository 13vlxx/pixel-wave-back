import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ProtectedAutoRolesDecorator } from './protected-auto-roles.decorator';

export const Protect = (...roles: RoleEnum[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    ApiUnauthorizedResponse({ description: 'UNAUTHORIZED' }),
    ApiForbiddenResponse({ description: 'FORBIDDEN' }),
    ProtectedAutoRolesDecorator(...roles),
  );
