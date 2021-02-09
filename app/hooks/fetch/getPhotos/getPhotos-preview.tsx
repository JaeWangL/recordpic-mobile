import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { PhotoPreviewDto, UserDto } from '@/dtos';
import { translate } from '@/i18n';
import { getPhotosPreviewAsync } from '@/services';
import { isAxiosError, LogUtil } from '@/utils';

interface PhotosPreviewState {
  photos: PhotoPreviewDto[];
  isLoading: boolean;
}

export const usePhotosPreviewFetch = (momentId: number, user?: UserDto, skip = false): PhotosPreviewState => {
  const [photos, setPhotos] = useState<PhotoPreviewDto[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const initAsync = async () => {
      if (!user || skip) {
        return;
      }

      setLoading(true);
      try {
        const res = await getPhotosPreviewAsync(momentId, user.accessToken);
        if (res) {
          setPhotos(res);
        }
      } catch (error) {
        if (isAxiosError(error) && !error.response) {
          Alert.alert('', translate('error.server'));
        }
        LogUtil(error);
      } finally {
        setLoading(false);
      }
    };

    initAsync();
  }, [momentId]);

  return { photos, isLoading };
};
