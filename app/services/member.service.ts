import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import {
  CreateMemberRequest,
  DeleteMemberRequest,
  MemberPreviewDto,
  MemberWithAlbumDto,
  PaginatedItemsViewModel,
} from '@/dtos';
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
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return undefined;
};

export const deleteMemberAsync = async (request: DeleteMemberRequest, accessToken: string): Promise<boolean> => {
  try {
    const res = await axios.delete<boolean>(apiEndpoints.members, {
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

export const getMembersPreviewAsync = async (
  albumId: number,
  accessToken: string,
  pageIndex = 0,
  pageSize = 10,
): Promise<PaginatedItemsViewModel<MemberPreviewDto> | undefined> => {
  try {
    const res = await axios.get<PaginatedItemsViewModel<MemberPreviewDto>>(
      `${apiEndpoints.members}/album/${albumId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
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
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return undefined;
};
