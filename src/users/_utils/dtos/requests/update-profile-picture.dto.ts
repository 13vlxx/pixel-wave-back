import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class UpdateProfilePictureDto {
  @IsFile()
  @MaxFileSize(8e6)
  @HasMimeType(['image/*'])
  profilePicture: MemoryStoredFile;
}
