import { $Enums } from '@prisma/client';

export class GetLiteUserDto {
  id: string;
  pseudo: string;
  profilePicture: string | null;
  role: $Enums.RoleEnum;
}
