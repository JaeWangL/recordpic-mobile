export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedUser {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export interface UserDto {
  id: number;
  email: string;
  iat: number;
  exp: number;
  accessToken: string;
  refreshToken: string;
}
