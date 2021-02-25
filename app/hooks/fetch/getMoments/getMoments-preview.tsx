import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MomentPreviewDto, UserDto } from '@/dtos';
import { translate } from '@/i18n';
import { getMomentsPreviewAsync } from '@/services';
import { isAxiosError, LogUtil } from '@/utils';

interface MomentsPreviewState {
  moments: MomentPreviewDto[];
  isLoading: boolean;
}

export const useMomentsPreviewFetch = (
  navigation: DrawerNavigationProp<any, any>,
  albumId: number,
  user?: UserDto,
  pageIndex = 0,
  pageSize = 10,
  skip = false,
): MomentsPreviewState => {
  const [moments, setMoments] = useState<MomentPreviewDto[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const initAsync = async () => {
      if (!user || skip) {
        return;
      }

      setLoading(true);
      try {
        const res = await getMomentsPreviewAsync(albumId, user.accessToken, pageIndex, pageSize);
        if (res) {
          setMoments(res.data);
        }
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          Alert.alert('', translate('error.server'));
        }
        LogUtil(error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      initAsync();
    });

    return unsubscribe;
  }, [navigation, albumId]);

  return { moments, isLoading };
};
