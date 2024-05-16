export interface UserSchema {
  id: string;
  email: string;
  pseudo: string;
  profilePicture: string;
  password: string;
  role: UserRole;
  resetPasswordCode: string;
  resetPasswordCodeDate: number;
  createdAt: Date;
  updatedAt: Date;
}

enum UserRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}
