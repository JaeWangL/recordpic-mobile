import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NotificationPreviewDto, UserDto } from '@/dtos';
import { translate } from '@/i18n';
import { getNotificationsPreviewAsync } from '@/services';
import { isAxiosError, LogUtil } from '@/utils';

interface NotificationsPreviewState {
  notifications: NotificationPreviewDto[];
  isLoading: boolean;
}

export const useNotificationsPreviewFetch = (
  user?: UserDto,
  pageIndex = 0,
  pageSize = 10,
  skip = false,
): NotificationsPreviewState => {
  const [notifications, setNotifications] = useState<NotificationPreviewDto[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const initAsync = async () => {
      if (!user || skip) {
        return;
      }

      setLoading(true);
      try {
        const res = await getNotificationsPreviewAsync(user.id, user.accessToken, pageIndex, pageSize);
        if (res) {
          setNotifications(res.data);
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

    initAsync();
  }, [user]);

  return { notifications, isLoading };
};
