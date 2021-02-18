export interface DecodedUser {
  id: number;
  email: string;
  name: string;
  imageUrl?: string;
  iat: number;
  exp: number;
}

export interface UserDto {
  id: number;
  email: string;
  name: string;
  imageUrl?: string;
  iat: number;
  exp: number;
  accessToken: string;
  refreshToken: string;
}

export interface UserPreviewDto {
  id: number;
  email: string;
  name: string;
  imageUrl?: string;
}

export interface UpdateProfileRequest {
  id: number;
  name: string;
  imageUrl?: string;
}
