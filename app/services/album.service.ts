import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import { CreateAlbumRequest, AlbumPreviewDto } from '@/dtos';
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
    if (isAxiosError(error) && !error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return undefined;
};
