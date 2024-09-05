import { $Enums } from '@prisma/client';

export class GetUserDto {
  id: string;
  email: string;
  pseudo: string;
  profilePicture: string;
  role: $Enums.RoleEnum;
  createdAt: Date;
}
