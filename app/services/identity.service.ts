import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import {
  AuthTokensDto,
  SignInRequest,
  SignInSocialRequest,
  SignOutRequest,
  UserPreviewDto,
  UpdateProfileRequest,
} from '@/dtos';
import { translate } from '@/i18n';
import { isAxiosError, LogUtil } from '@/utils';

export const signInAsync = async (request: SignInRequest): Promise<AuthTokensDto | undefined> => {
  try {
    const res = await axios.post<AuthTokensDto>(`${apiEndpoints.auth}/signIn`, request);

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return undefined;
};

export const signInSocialAsync = async (request: SignInSocialRequest): Promise<AuthTokensDto | undefined> => {
  try {
    const res = await axios.post<AuthTokensDto>(`${apiEndpoints.auth}/signIn/social`, request);

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return undefined;
};

export const signOutAsync = async (request: SignOutRequest): Promise<boolean> => {
  try {
    const res = await axios.post<boolean>(`${apiEndpoints.auth}/signOut`, request);

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return false;
};

export const updateProfileAsync = async (
  request: UpdateProfileRequest,
  accessToken: string,
): Promise<UserPreviewDto | undefined> => {
  try {
    const res = await axios.put<UserPreviewDto>(`${apiEndpoints.users}/profile`, request, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return undefined;
};
