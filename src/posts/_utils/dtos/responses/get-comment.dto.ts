import { GetLiteUserDto } from '../../../../users/_utils/dtos/responses/get-lite-user.dto';

export class GetCommentDto {
  id: string;
  content: string;
  user: GetLiteUserDto;
  createdAt: Date;
}
