import { OmitType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class CreateCommentDto extends OmitType(CreatePostDto, ['photo']) {}
