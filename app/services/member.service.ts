import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import { CreateMemberRequest, MemberPreviewDto, MemberWithAlbumDto, PaginatedItemsViewModel } from '@/dtos';
import { translate } from '@/i18n';
import { isAxiosError, LogUtil } from '@/utils';

export const createMemberAsync = async (
  request: CreateMemberRequest,
  accessToken: string,
): Promise<MemberPreviewDto | undefined> => {
  try {
    const res = await axios.post<MemberPreviewDto>(apiEndpoints.members, request, {
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

export const getMembersPreviewAsync = async (
  albumId: number,
  accessToken: string,
): Promise<PaginatedItemsViewModel<MemberPreviewDto> | undefined> => {
  try {
    const res = await axios.get<PaginatedItemsViewModel<MemberPreviewDto>>(`${apiEndpoints.members}/album/${albumId}`, {
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

export const getMembersWithAlbumAsync = async (
  userId: number,
  accessToken: string,
): Promise<MemberWithAlbumDto[] | undefined> => {
  try {
    const res = await axios.get<MemberWithAlbumDto[]>(`${apiEndpoints.members}/user/${userId}`, {
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
