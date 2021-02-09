import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import { AuthTokensDto, SignInRequest, SignInSocialRequest } from '@/dtos';
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
