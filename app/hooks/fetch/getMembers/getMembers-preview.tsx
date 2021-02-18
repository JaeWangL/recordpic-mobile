import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MemberPreviewDto, UserDto } from '@/dtos';
import { translate } from '@/i18n';
import { getMembersPreviewAsync } from '@/services';
import { isAxiosError, LogUtil } from '@/utils';

interface MembersPreviewState {
  members: MemberPreviewDto[];
  isLoading: boolean;
  doRefresh: () => void;
}

export const useMembersPreviewFetch = (
  albumId: number,
  user?: UserDto,
  pageIndex = 0,
  pageSize = 10,
  skip = false,
): MembersPreviewState => {
  const [members, setMembers] = useState<MemberPreviewDto[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const initAsync = async () => {
      if (!user || skip) {
        return;
      }

      setLoading(true);
      try {
        const res = await getMembersPreviewAsync(albumId, user.accessToken, pageIndex, pageSize);
        if (res) {
          if (isRefreshing) {
            setRefreshing(false);
          }
          setMembers(res.data);
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
  }, [albumId, isRefreshing]);

  const doRefresh = useCallback(() => {
    setRefreshing(true);
  }, [isRefreshing]);

  return { members, isLoading, doRefresh };
};
