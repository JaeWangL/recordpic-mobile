import { SocialSignInType, UserDto } from '@/dtos';

export interface SignInPayload {
  email: string;
  password?: string;
  name?: string;
  imageUrl: string | null;
  socialType?: SocialSignInType;
  socialId?: string;
}

export interface SignInFailedPayload {
  errorMsg: string;
}

export interface SignInSuccessPayload {
  user: UserDto;
}

export interface SignOutPayload {
  clearStorage: boolean;
}

export interface UpdateUserPayload {
  id: number;
  name: string;
  imageUrl?: string;
  accessToken: string;
}

export interface UpdateUserFailedPayload {
  errorMsg: string;
}

export interface UpdateUserSuccessPayload {
  user: UserDto;
}

export type Payload =
  | SignInPayload
  | SignInFailedPayload
  | SignInSuccessPayload
  | SignOutPayload
  | UpdateUserPayload
  | UpdateUserFailedPayload
  | UpdateUserSuccessPayload;
