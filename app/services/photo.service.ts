import axios from 'axios';
import { apiEndpoints } from '@/configs';
import { PhotoPreviewDto } from '@/dtos';

export const getPhotosPreviewAsync = async (momentId: number, accessToken: string): Promise<PhotoPreviewDto[]> => {
  const res = await axios.get<PhotoPreviewDto[]>(`${apiEndpoints.photos}/moment/${momentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
};
