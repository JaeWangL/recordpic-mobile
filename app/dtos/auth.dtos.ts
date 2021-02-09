export enum SignInType {
  Web = 0,
  Mobile = 1,
}

export enum SocialSignInType {
  Google = 0,
  Naver = 1,
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface TokenRefreshingRequest {
  type: SignInType;
  refreshToken: string;
}

export interface SignInRequest {
  email: string;
  password: string;
  type: SignInType;
}

export interface SignInSocialRequest {
  email: string;
  name: string;
  imageUrl?: string;
  type: SignInType;
  socialType: SocialSignInType;
  socialId: string;
}

export interface SignOutRequest {
  userId: number;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  imageUrl?: string;
}
