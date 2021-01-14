import { UserDto } from '@/dtos';

export interface SignInPayload {
  email: string;
  password: string;
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

export type Payload = SignInPayload | SignInFailedPayload | SignInSuccessPayload | SignOutPayload;
