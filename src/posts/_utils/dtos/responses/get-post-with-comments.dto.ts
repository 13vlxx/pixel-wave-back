import { GetCommentDto } from './get-comment.dto';
import { GetPostDto } from './get-post.dto';

export class GetPostWithCommentsDto extends GetPostDto {
  postComments: GetCommentDto[];
}
