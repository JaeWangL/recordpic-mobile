import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import { AlbumPreviewDto, CreateAlbumRequest, DeleteAlbumRequest, UpdateAlbumRequest } from '@/dtos';
import { translate } from '@/i18n';
import { isAxiosError, LogUtil } from '@/utils';

export const createAlbumAsync = async (
  request: CreateAlbumRequest,
  accessToken: string,
): Promise<AlbumPreviewDto | undefined> => {
  try {
    const res = await axios.post<AlbumPreviewDto>(apiEndpoints.albums, request, {
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

export const deleteAlbumAsync = async (request: DeleteAlbumRequest, accessToken: string): Promise<boolean> => {
  try {
    const res = await axios.delete<boolean>(apiEndpoints.albums, {
      data: request,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return false;
};

export const updateAlbumAsync = async (
  request: UpdateAlbumRequest,
  accessToken: string,
): Promise<AlbumPreviewDto | undefined> => {
  try {
    const res = await axios.put<AlbumPreviewDto>(apiEndpoints.albums, request, {
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
