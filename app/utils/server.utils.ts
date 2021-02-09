import { AxiosError } from 'axios';
import JwtDecode from 'jwt-decode';
import { DecodedUser, UserDto } from '@/dtos';

export const isAxiosError = (error: any): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export const decodeUser = (accessToken: string, refreshToken: string): UserDto => {
  const decoded: DecodedUser = JwtDecode(accessToken);
  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    imageUrl: decoded.imageUrl,
    iat: decoded.iat,
    exp: decoded.exp,
    accessToken,
    refreshToken,
  } as UserDto;
};
