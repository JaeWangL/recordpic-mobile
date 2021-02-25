import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import {
  CreateCommentRequest,
  DeleteCommentRequest,
  CommentPreviewDto,
  PaginatedItemsViewModel,
  UpdateCommentRequest,
} from '@/dtos';
import { translate } from '@/i18n';
import { isAxiosError, LogUtil } from '@/utils';

export const createCommentAsync = async (
  request: CreateCommentRequest,
  accessToken: string,
): Promise<CommentPreviewDto> => {
  const res = await axios.post<CommentPreviewDto>(apiEndpoints.comments, request, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
};

export const deleteCommentAsync = async (request: DeleteCommentRequest, accessToken: string): Promise<boolean> => {
  try {
    const res = await axios.delete<boolean>(apiEndpoints.comments, {
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

export const updateCommentAsync = async (
  request: UpdateCommentRequest,
  accessToken: string,
): Promise<CommentPreviewDto> => {
  const res = await axios.put<CommentPreviewDto>(apiEndpoints.comments, request, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
};

export const getCommentsPreviewAsync = async (
  momentId: number,
  accessToken: string,
  pageIndex = 0,
  pageSize = 10,
): Promise<PaginatedItemsViewModel<CommentPreviewDto>> => {
  const res = await axios.get<PaginatedItemsViewModel<CommentPreviewDto>>(
    `${apiEndpoints.comments}/moment/${momentId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  return res.data;
};
