import { GetLiteUserDto } from '../../../../users/_utils/dtos/responses/get-lite-user.dto';

export class GetPostDto {
  id: string;
  content: string;
  createdAt: Date;
  photo: string | null;
  user: GetLiteUserDto;
  likes: number;
  comments: number;
  isLiked: boolean;
}
