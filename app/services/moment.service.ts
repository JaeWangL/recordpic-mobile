import axios from 'axios';
import { apiEndpoints } from '@/configs';
import { CreateMomentRequest, MomentPreviewDto, PaginatedItemsViewModel } from '@/dtos';

export const createMomentAsync = async (
  request: CreateMomentRequest,
  accessToken: string,
): Promise<MomentPreviewDto> => {
  const res = await axios.post<MomentPreviewDto>(apiEndpoints.moments, request, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
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
