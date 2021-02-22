import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import {
  CreateMomentRequest,
  DeleteMomentRequest,
  MomentPreviewDto,
  PaginatedItemsViewModel,
  UpdateMomentRequest,
} from '@/dtos';
import { translate } from '@/i18n';
import { isAxiosError, LogUtil } from '@/utils';

export const createMomentAsync = async (
  request: CreateMomentRequest,
  accessToken: string,
): Promise<MomentPreviewDto> => {
  const res = await axios.post<MomentPreviewDto>(apiEndpoints.moments, request, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
};

export const deleteMomentAsync = async (request: DeleteMomentRequest, accessToken: string): Promise<boolean> => {
  try {
    const res = await axios.delete<boolean>(apiEndpoints.moments, {
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

export const updateMomentAsync = async (
  request: UpdateMomentRequest,
  accessToken: string,
): Promise<MomentPreviewDto> => {
  const res = await axios.put<MomentPreviewDto>(apiEndpoints.moments, request, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
};

export const getMomentPreviewAsync = async (id: number, accessToken: string): Promise<MomentPreviewDto | undefined> => {
  try {
    const res = await axios.get<MomentPreviewDto>(`${apiEndpoints.moments}/${id}`, {
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

export const getMomentsPreviewAsync = async (
  albumId: number,
  accessToken: string,
  pageIndex = 0,
  pageSize = 10,
): Promise<PaginatedItemsViewModel<MomentPreviewDto>> => {
  const res = await axios.get<PaginatedItemsViewModel<MomentPreviewDto>>(
    `${apiEndpoints.moments}/album/${albumId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  return res.data;
};
